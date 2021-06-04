import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Heading, Hr, Page } from 'components';
import {
  PlaylistsQueryVariables,
  usePlaylistsQuery,
} from './graphql/playlists';

export default function Playlists() {
  const { t } = useTranslation();
  // state
  const [playlistVariables, setPlaylistVariables] =
    useState<PlaylistsQueryVariables>({ first: 3 });

  const { data, loading, error } = usePlaylistsQuery({
    variables: playlistVariables,
  });

  // for pagination
  const next = () =>
    setPlaylistVariables({
      after: data?.playlists?.pageInfo.endCursor,
      before: null,
    });

  const previous = () =>
    setPlaylistVariables({
      after: null,
      before: data?.playlists?.pageInfo.startCursor,
    });

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      <p>
        <i>Some awesome Playlists are listed below, go check them out!</i>
      </p>
      {loading && <p>Loading all playlists</p>}
      {error && <p>{error.message}</p>}
      {!loading && (
        <>
          <ul
            style={{ listStyle: 'none', padding: '0px', marginBottom: '15px' }}
          >
            {data?.playlists?.edges?.map((edge) => (
              <li key={edge?.node?.id} style={{ margin: '10px 0' }}>
                #{edge?.node?.id}
                <strong style={{ marginLeft: '10px' }}>
                  {edge?.node?.name}
                </strong>
              </li>
            ))}
          </ul>

          {data?.playlists?.pageInfo.hasPreviousPage ? (
            <Button onClick={previous}>previous page</Button>
          ) : null}

          {data?.playlists?.pageInfo.hasNextPage ? (
            <Button onClick={next}>next page</Button>
          ) : null}
        </>
      )}
    </Page>
  );
}
