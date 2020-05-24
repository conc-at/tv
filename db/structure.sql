SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: playlist_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.playlist_state AS ENUM (
    'draft',
    'published'
);


--
-- Name: rationale; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.rationale AS (
	p integer,
	q integer
);


--
-- Name: channels_sbt_initial_row_position(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.channels_sbt_initial_row_position() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    pos RATIONALE; -- fraction above insert position
    np  int; nq int; -- new insert position fraction
BEGIN
    -- lock the row
    PERFORM 1 FROM "channels"
      WHERE "id" = NEW."id" FOR UPDATE;

    -- find the next adjacent row in the desired direction
    SELECT (c."position").p, (c."position").q
    INTO pos.p, pos.q
    FROM channels c
    WHERE c."id" != NEW."id"
      AND (("position").p::float8 / ("position").q) > 0
    ORDER BY (("position").p::float8 / ("position").q) DESC
    LIMIT 1;

    -- compute insert fraction
    SELECT *
    INTO np, nq
    FROM channels_sbt_mediant(
            COALESCE(pos.p, 0), COALESCE(pos.q, 1),
            1, 0);

    -- set the position
    NEW."position" = (np, nq);

    RETURN NEW;
END;
$$;


--
-- Name: channels_sbt_mediant(integer, integer, integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.channels_sbt_mediant(p1 integer, q1 integer, p2 integer, q2 integer, OUT p integer, OUT q integer) RETURNS record
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    pl INTEGER := 0;
    ql INTEGER := 1;
    ph INTEGER := 1;
    qh INTEGER := 0;
BEGIN
    IF (p1::BIGINT * q2 + 1) <> (p2::BIGINT * q1) THEN
        loop
            p := pl + ph;
            q := ql + qh;
            IF (p::BIGINT * q1 <= q::BIGINT * p1) THEN
                pl := p; ql := q;
            elsif (p2::BIGINT * q <= q2::BIGINT * p) THEN
                ph := p; qh := q;
            ELSE
                exit;
            END IF;
        END loop;
    ELSE
        p := p1 + p2;
        q := q1 + q2;
    END IF;
END;
$$;


--
-- Name: channels_sbt_move_row(integer, integer, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.channels_sbt_move_row(row_id integer, rel_id integer, is_before boolean) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    pos1  RATIONALE; -- fraction below insert position
    pos2  RATIONALE; -- fraction above insert position
    r_rel DOUBLE PRECISION; -- p/q of the rel_id row
    np    int; nq int; -- new insert position fraction
BEGIN
    -- lock the row
    PERFORM 1 FROM "channels" WHERE "id" = row_id FOR UPDATE;

    -- moving a record to its own position is a no-op
    IF rel_id = row_id THEN RETURN; END IF;

    -- if we're positioning next to a specified row, it must exist
    IF rel_id IS NOT NULL THEN
        SELECT (t."position").p, (t."position").q
          FROM "channels" t
          WHERE "id" = rel_id
          INTO strict pos1.p, pos1.q;
        r_rel := pos1.p::float8 / pos1.q;
    END IF;


    -- find the next adjacent row in the desired direction
    -- (might not exist).
    IF is_before THEN
        pos2.p := pos1.p; pos2.q := pos1.q;
        SELECT (t2."position").p, (t2."position").q
          FROM "channels" t2
          WHERE "id" != row_id
            AND (
              ("position").p::float8 / ("position").q) < COALESCE(r_rel, 'infinity')
          ORDER BY (
              ("position").p::float8 / ("position").q) DESC
          LIMIT 1
          INTO pos1.p, pos1.q;
    ELSE
        SELECT (t3."position").p, (t3."position").q
          FROM "channels" t3
          WHERE "id" != row_id
            AND (("position").p::float8 / ("position").q) > COALESCE(r_rel, 0)
          ORDER BY (("position").p::float8 / ("position").q) ASC
          LIMIT 1
          INTO pos2.p, pos2.q;
    END IF;

    -- compute insert fraction
    SELECT *
    INTO np, nq
    FROM channels_sbt_mediant(COALESCE(pos1.p, 0), COALESCE(pos1.q, 1),
                     COALESCE(pos2.p, 1), COALESCE(pos2.q, 0));


    -- move the specified row
    UPDATE "channels"
      SET ("position".p, "position".q) = (np, nq)
    WHERE "id" = row_id;

    -- want to renormalize both to avoid possibility of integer overflow
    -- and to ensure that distinct fraction values map to distinct float8
    -- values. Bounding to 10 million gives us reasonable headroom while
    -- not requiring frequent normalization.

    IF (np > 10000000) OR (nq > 10000000) THEN
        perform channels_sbt_renormalize();
    END IF;
END;
$$;


--
-- Name: channels_sbt_renormalize(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.channels_sbt_renormalize() RETURNS void
    LANGUAGE plpgsql STRICT
    AS $$
BEGIN
    -- lock the table
    SELECT 1 FROM "channels" FOR UPDATE;

    -- normalize
    UPDATE "channels" c
      SET"position" = (s2.new_rnum, 2)
        FROM (SELECT "id",
                     is_existing = 0 AS is_new,
                     -- increase the current value according to the
                     -- number of adjustment points passed
                     rnum + 2 * (SUM(is_existing)
                                OVER (ORDER BY rnum))
                                   AS new_rnum
              FROM (
                   -- assign the initial simple values to every item'
                   -- in order
                   SELECT "id",
                          2 * (ROW_NUMBER()
                               OVER (ORDER BY ("position").p::float8 / ("position").q)) -
                          1
                              AS rnum,
                          0   AS is_existing
                   FROM "channels" t2
                   UNION ALL
                   -- and merge in the adjustment points required to
                   -- skip over existing x/2 values
                   SELECT "id",
                          ("position").p + 2 -
                          2 * (COUNT(*) OVER (ORDER BY ("position").p))
                              AS rnum,
                          1   AS is_existing
                   FROM "channels" t3
                   WHERE ("position").q = 2
              ) s1
            ) s2
            WHERE s2."id" = c."id"
              AND s2.is_new;
END;
$$;


--
-- Name: playlist_channels_sbt_initial_row_position(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.playlist_channels_sbt_initial_row_position() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    pos RATIONALE; -- fraction above insert position
    np  int; nq int; -- new insert position fraction
BEGIN
    -- lock the row
    PERFORM 1 FROM "playlist_channels" t
      WHERE t."id" = NEW."id" FOR UPDATE;

    -- find the next adjacent row in the desired direction
    SELECT (c."position").p, (c."position").q
    INTO pos.p, pos.q
    FROM playlist_channels c
    WHERE c."id" != NEW."id"
      AND (("position").p::float8 / ("position").q) > 0
    ORDER BY (("position").p::float8 / ("position").q) DESC
    LIMIT 1;

    -- compute insert fraction
    SELECT *
    INTO np, nq
    FROM playlist_channels_sbt_mediant(
      COALESCE(pos.p, 0),
      COALESCE(pos.q, 1),
      1,
      0
    );

    -- set the position
    NEW."position" = (np, nq);

    RETURN NEW;
END;
$$;


--
-- Name: playlist_channels_sbt_mediant(integer, integer, integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.playlist_channels_sbt_mediant(p1 integer, q1 integer, p2 integer, q2 integer, OUT p integer, OUT q integer) RETURNS record
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    pl INTEGER := 0;
    ql INTEGER := 1;
    ph INTEGER := 1;
    qh INTEGER := 0;
BEGIN
    IF (p1::BIGINT * q2 + 1) != (p2::BIGINT * q1) THEN
        loop
            p := pl + ph;
            q := ql + qh;
            IF (p::BIGINT * q1 <= q::BIGINT * p1) THEN
                pl := p; ql := q;
            ELSIF (p2::BIGINT * q <= q2::BIGINT * p) THEN
                ph := p; qh := q;
            ELSE
                exit;
            END IF;
        END loop;
    ELSE
        p := p1 + p2;
        q := q1 + q2;
    END IF;
END;
$$;


--
-- Name: playlist_channels_sbt_move_row(integer, integer, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.playlist_channels_sbt_move_row(row_id integer, rel_id integer, is_before boolean) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    pos1  RATIONALE; -- fraction below insert position
    pos2  RATIONALE; -- fraction above insert position
    r_rel DOUBLE PRECISION; -- p/q of the rel_id row
    np    int; nq int; -- new insert position fraction
BEGIN
    -- lock the row
    PERFORM 1 FROM "playlist_channels" WHERE "id" = row_id FOR UPDATE;

    -- moving a record to its own position is a no-op
    IF rel_id = row_id THEN RETURN; END IF;

    -- if we're positioning next to a specified row, it must exist
    IF rel_id IS NOT NULL THEN
        SELECT (t."position").p, (t."position").q
          FROM "playlist_channels" t
          WHERE "id" = rel_id
          INTO strict pos1.p, pos1.q;
        r_rel := pos1.p::float8 / pos1.q;
    END IF;

    -- find the next adjacent row in the desired direction
    -- (might not exist).
    IF is_before THEN
        pos2.p := pos1.p; pos2.q := pos1.q;
        SELECT (t2."position").p, (t2."position").q
          FROM "playlist_channels" t2
          WHERE "id" != row_id
            AND (
              ("position").p::float8 / ("position").q) < COALESCE(r_rel, 'infinity')
          ORDER BY (
              ("position").p::float8 / ("position").q) DESC
          LIMIT 1
          INTO pos1.p, pos1.q;
    ELSE
        SELECT (t3."position").p, (t3."position").q
          FROM "playlist_channels" t3
          WHERE "id" != row_id
            AND (("position").p::float8 / ("position").q) > COALESCE(r_rel, 0)
          ORDER BY (("position").p::float8 / ("position").q) ASC
          LIMIT 1
          INTO pos2.p, pos2.q;
    END IF;

    -- compute insert fraction
    SELECT *
    INTO np, nq
    FROM playlist_channels_sbt_mediant(COALESCE(pos1.p, 0), COALESCE(pos1.q, 1),
                     COALESCE(pos2.p, 1), COALESCE(pos2.q, 0));

    -- move the specified row
    UPDATE "playlist_channels"
      SET ("position".p, "position".q) = (np, nq)
      WHERE "id" = row_id;

    -- want to renormalize both to avoid possibility of integer overflow
    -- and to ensure that distinct fraction values map to distinct float8
    -- values. Bounding to 10 million gives us reasonable headroom while
    -- not requiring frequent normalization.

    IF (np > 10000000) OR (nq > 10000000) THEN
        perform playlist_channels_sbt_renormalize();
    END IF;
END;
$$;


--
-- Name: playlist_channels_sbt_renormalize(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.playlist_channels_sbt_renormalize() RETURNS void
    LANGUAGE plpgsql STRICT
    AS $$
BEGIN
    -- lock the table
    SELECT 1 FROM "playlist_channels" FOR UPDATE;

    -- normalize
    UPDATE "playlist_channels" c
      SET"position" = (s2.new_rnum, 2)
        FROM (SELECT "id",
                     is_existing = 0 AS is_new,
                     -- increase the current value according to the
                     -- number of adjustment points passed
                     rnum + 2 * (SUM(is_existing)
                                OVER (ORDER BY rnum))
                                   AS new_rnum
              FROM (
                   -- assign the initial simple values to every item'
                   -- in order
                   SELECT "id",
                          2 * (ROW_NUMBER()
                               OVER (ORDER BY ("position").p::float8 / ("position").q)) -
                          1
                              AS rnum,
                          0   AS is_existing
                   FROM "playlist_channels" t2
                   UNION ALL
                   -- and merge in the adjustment points required to
                   -- skip over existing x/2 values
                   SELECT "id",
                          ("position").p + 2 -
                          2 * (COUNT(*) OVER (ORDER BY ("position").p))
                              AS rnum,
                          1   AS is_existing
                   FROM "playlist_channels" t3
                   WHERE ("position").q = 2
              ) s1
            ) s2
            WHERE s2."id" = c."id"
              AND s2.is_new;
END;
$$;


--
-- Name: playlists_sbt_initial_row_position(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.playlists_sbt_initial_row_position() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    pos RATIONALE; -- fraction above insert position
    np  int; nq int; -- new insert position fraction
BEGIN
    -- lock the row
    PERFORM 1 FROM "playlists" t
      WHERE t."id" = NEW."id" FOR UPDATE;

    -- find the next adjacent row in the desired direction
    SELECT (c."position").p, (c."position").q
    INTO pos.p, pos.q
    FROM playlists c
    WHERE c."id" != NEW."id"
      AND (("position").p::float8 / ("position").q) > 0
    ORDER BY (("position").p::float8 / ("position").q) DESC
    LIMIT 1;

    -- compute insert fraction
    SELECT *
    INTO np, nq
    FROM playlists_sbt_mediant(
      COALESCE(pos.p, 0),
      COALESCE(pos.q, 1),
      1,
      0
    );

    -- set the position
    NEW."position" = (np, nq);

    RETURN NEW;
END;
$$;


--
-- Name: playlists_sbt_mediant(integer, integer, integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.playlists_sbt_mediant(p1 integer, q1 integer, p2 integer, q2 integer, OUT p integer, OUT q integer) RETURNS record
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    pl INTEGER := 0;
    ql INTEGER := 1;
    ph INTEGER := 1;
    qh INTEGER := 0;
BEGIN
    IF (p1::BIGINT * q2 + 1) <> (p2::BIGINT * q1) THEN
        loop
            p := pl + ph;
            q := ql + qh;
            IF (p::BIGINT * q1 <= q::BIGINT * p1) THEN
                pl := p; ql := q;
            elsif (p2::BIGINT * q <= q2::BIGINT * p) THEN
                ph := p; qh := q;
            ELSE
                exit;
            END IF;
        END loop;
    ELSE
        p := p1 + p2;
        q := q1 + q2;
    END IF;
END;
$$;


--
-- Name: playlists_sbt_move_row(integer, integer, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.playlists_sbt_move_row(row_id integer, rel_id integer, is_before boolean) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    pos1  RATIONALE; -- fraction below insert position
    pos2  RATIONALE; -- fraction above insert position
    r_rel DOUBLE PRECISION; -- p/q of the rel_id row
    np    int; nq int; -- new insert position fraction
BEGIN
    -- lock the row
    PERFORM 1 FROM "playlists" WHERE "id" = row_id FOR UPDATE;

    -- moving a record to its own position is a no-op
    IF rel_id = row_id THEN RETURN; END IF;

    -- if we're positioning next to a specified row, it must exist
    IF rel_id IS NOT NULL THEN
        SELECT (t."position").p, (t."position").q
          FROM "playlists" t
          WHERE "id" = rel_id
          INTO strict pos1.p, pos1.q;
        r_rel := pos1.p::float8 / pos1.q;
    END IF;

    -- find the next adjacent row in the desired direction
    -- (might not exist).
    IF is_before THEN
        pos2.p := pos1.p; pos2.q := pos1.q;
        SELECT (t2."position").p, (t2."position").q
          FROM "playlists" t2
          WHERE "id" != row_id
            AND (
              ("position").p::float8 / ("position").q) < COALESCE(r_rel, 'infinity')
          ORDER BY (
              ("position").p::float8 / ("position").q)
          DESC LIMIT 1
          INTO pos1.p, pos1.q;
    ELSE
        SELECT (t3."position").p, (t3."position").q
          FROM "playlists" t3
          WHERE "id" != row_id
            AND (("position").p::float8 / ("position").q) > COALESCE(r_rel, 0)
          ORDER BY (("position").p::float8 / ("position").q)
          LIMIT 1
          INTO pos2.p, pos2.q;
    END IF;

    -- compute insert fraction
    SELECT *
    INTO np, nq
    FROM playlists_sbt_mediant(COALESCE(pos1.p, 0), COALESCE(pos1.q, 1),
                     COALESCE(pos2.p, 1), COALESCE(pos2.q, 0));

    -- move the specified row
    UPDATE "playlists"
      SET ("position".p, "position".q) = (np, nq)
      WHERE "id" = row_id;

    -- want to renormalize both to avoid possibility of integer overflow
    -- and to ensure that distinct fraction values map to distinct float8
    -- values. Bounding to 10 million gives us reasonable headroom while
    -- not requiring frequent normalization.

    IF (np > 10000000) OR (nq > 10000000) THEN
        perform playlists_sbt_renormalize();
    END IF;
END;
$$;


--
-- Name: playlists_sbt_renormalize(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.playlists_sbt_renormalize() RETURNS void
    LANGUAGE plpgsql STRICT
    AS $$
BEGIN
    -- lock the table
    SELECT 1 FROM "playlists" FOR UPDATE;

    -- normalize
    UPDATE "playlists" c
      SET"position" = (s2.new_rnum, 2)
        FROM (SELECT "id",
                     is_existing = 0 AS is_new,
                     -- increase the current value according to the
                     -- number of adjustment points passed
                     rnum + 2 * (SUM(is_existing)
                                OVER (ORDER BY rnum))
                                   AS new_rnum
              FROM (
                   -- assign the initial simple values to every item'
                   -- in order
                   SELECT "id",
                          2 * (ROW_NUMBER()
                               OVER (ORDER BY ("position").p::float8 / ("position").q)) -
                          1
                              AS rnum,
                          0   AS is_existing
                   FROM "playlists" t2
                   UNION ALL
                   -- and merge in the adjustment points required to
                   -- skip over existing x/2 values
                   SELECT "id",
                          ("position").p + 2 -
                          2 * (COUNT(*) OVER (ORDER BY ("position").p))
                              AS rnum,
                          1   AS is_existing
                   FROM "playlists" t3
                   WHERE ("position").q = 2
              ) s1
            ) s2
            WHERE s2."id" = c."id"
              AND s2.is_new;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: channels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.channels (
    id bigint NOT NULL,
    data text NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    path character varying NOT NULL,
    state character varying DEFAULT 'offline'::character varying NOT NULL,
    "position" public.rationale
);


--
-- Name: channels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.channels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.channels_id_seq OWNED BY public.channels.id;


--
-- Name: playlist_channels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.playlist_channels (
    playlist_id bigint NOT NULL,
    channel_id bigint NOT NULL,
    id bigint NOT NULL,
    "position" public.rationale
);


--
-- Name: playlist_channels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.playlist_channels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: playlist_channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.playlist_channels_id_seq OWNED BY public.playlist_channels.id;


--
-- Name: playlists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.playlists (
    id bigint NOT NULL,
    name character varying NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    "position" public.rationale,
    user_id bigint NOT NULL
);


--
-- Name: playlists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.playlists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: playlists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.playlists_id_seq OWNED BY public.playlists.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: channels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.channels ALTER COLUMN id SET DEFAULT nextval('public.channels_id_seq'::regclass);


--
-- Name: playlist_channels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playlist_channels ALTER COLUMN id SET DEFAULT nextval('public.playlist_channels_id_seq'::regclass);


--
-- Name: playlists id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playlists ALTER COLUMN id SET DEFAULT nextval('public.playlists_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);


--
-- Name: playlist_channels playlist_channels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playlist_channels
    ADD CONSTRAINT playlist_channels_pkey PRIMARY KEY (id);


--
-- Name: playlists playlists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_channels_on_path; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_channels_on_path ON public.channels USING btree (path);


--
-- Name: index_channels_on_position; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_channels_on_position ON public.channels USING btree ("position");


--
-- Name: index_playlist_channels_on_channel_id_and_playlist_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_playlist_channels_on_channel_id_and_playlist_id ON public.playlist_channels USING btree (channel_id, playlist_id);


--
-- Name: index_playlist_channels_on_playlist_id_and_channel_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_playlist_channels_on_playlist_id_and_channel_id ON public.playlist_channels USING btree (playlist_id, channel_id);


--
-- Name: index_playlist_channels_on_position; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_playlist_channels_on_position ON public.playlist_channels USING btree ("position");


--
-- Name: index_playlists_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_playlists_on_name ON public.playlists USING btree (name);


--
-- Name: index_playlists_on_position; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_playlists_on_position ON public.playlists USING btree ("position");


--
-- Name: index_playlists_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_playlists_on_user_id ON public.playlists USING btree (user_id);


--
-- Name: index_users_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_name ON public.users USING btree (name);


--
-- Name: channels channels_initial_channel_position; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER channels_initial_channel_position BEFORE INSERT ON public.channels FOR EACH ROW EXECUTE FUNCTION public.channels_sbt_initial_row_position();


--
-- Name: playlist_channels playlist_channels_initial_position; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER playlist_channels_initial_position BEFORE INSERT ON public.playlist_channels FOR EACH ROW EXECUTE FUNCTION public.playlist_channels_sbt_initial_row_position();


--
-- Name: playlists playlists_initial_position; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER playlists_initial_position BEFORE INSERT ON public.playlists FOR EACH ROW EXECUTE FUNCTION public.playlists_sbt_initial_row_position();


--
-- Name: playlist_channels fk_rails_68a7d73eb5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playlist_channels
    ADD CONSTRAINT fk_rails_68a7d73eb5 FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE;


--
-- Name: playlists fk_rails_d67ef1eb45; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT fk_rails_d67ef1eb45 FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: playlist_channels fk_rails_e8ff7ea515; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.playlist_channels
    ADD CONSTRAINT fk_rails_e8ff7ea515 FOREIGN KEY (playlist_id) REFERENCES public.playlists(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20200403012333'),
('20200403012341'),
('20200403012430'),
('20200403211759'),
('20200403212224'),
('20200403212735'),
('20200404163221'),
('20200405180733'),
('20200405181353'),
('20200405215516'),
('20200405235737'),
('20200406001033'),
('20200412194722'),
('20200412221633'),
('20200412222035'),
('20200413024453'),
('20200413025706'),
('20200413041533'),
('20200419210911'),
('20200419211717'),
('20200419212135'),
('20200426193238'),
('20200427010254'),
('20200427010347'),
('20200427010609'),
('20200427020341'),
('20200427020655'),
('20200428005953'),
('20200503183436'),
('20200503193052'),
('20200503194022'),
('20200503194958'),
('20200503204734'),
('20200511003753'),
('20200511004149'),
('20200511004443'),
('20200517191657'),
('20200517191915'),
('20200517192021'),
('20200517192132'),
('20200517192245'),
('20200517192358'),
('20200517192358');
