import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Heading, Hr, Page } from "components";
import {
  PlaylistsQueryVariables,
  usePlaylistsQuery
} from "sections/playlists/graphql/playlists";

export default function Playlists() {

  const { t } = useTranslation();
  const [variables, setVariables] = useState<PlaylistsQueryVariables>({
    first: 5,
  });
  const { data, loading, fetchMore } = usePlaylistsQuery({ variables });
  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      <ul>
        {data?.playlists?.edges?.map(list => (
          <li key={list?.node?.id}>{list?.node?.name}</li>
        ))}
      </ul>
    </Page>
  );
}
