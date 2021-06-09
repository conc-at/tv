import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Heading, Hr, Page } from 'components';
import {
  PlaylistsQueryVariables,
  usePlaylistsQuery,
} from './graphql/playlists';
import { Button } from 'components/button';

const PAGE_SIZE = 10;

export default function Playlists() {
  const { t } = useTranslation();
  const [queryVariables, setQueryVariables] = useState<PlaylistsQueryVariables>(
    {
      before: null,
      after: null,
      first: PAGE_SIZE,
      last: null,
    },
  );
  const { data, loading } = usePlaylistsQuery({
    variables: queryVariables,
  });

  const nextPage = () =>
    setQueryVariables({
      first: PAGE_SIZE,
      last: null,
      after: data?.playlists?.pageInfo.endCursor,
      before: null,
    });

  const previousPage = () =>
    setQueryVariables({
      first: null,
      last: PAGE_SIZE,
      after: null,
      before: data?.playlists?.pageInfo.startCursor,
    });

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      {loading && <p>loading queries...</p>}
      {!loading && (
        <ul>
          {data?.playlists?.edges?.map((playlist) => (
            <li key={playlist?.node?.id}>{playlist?.node?.name}</li>
          ))}
        </ul>
      )}

      {data?.playlists?.pageInfo.hasNextPage && (
        <Button onClick={nextPage}>Next Page</Button>
      )}

      {data?.playlists?.pageInfo.hasPreviousPage && (
        <Button onClick={previousPage}>Previous Page</Button>
      )}
    </Page>
  );
}
