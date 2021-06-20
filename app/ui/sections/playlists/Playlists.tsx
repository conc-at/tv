import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Heading, Hr, Page, Stack } from 'components';

import { List } from './components';
import {
  FetchPlaylistsQuery,
  useFetchPlaylistsQuery,
} from './graphql/playlists';

export default function Playlists() {
  const { t } = useTranslation();

  const first = 3;

  const { data, fetchMore } = useFetchPlaylistsQuery({ variables: { first } });
  const playlists = extractPlaylists(data);

  const hasNextPage = data?.playlists?.pageInfo.hasNextPage;

  const loadMore = useCallback(() => {
    const endCursor = data?.playlists?.pageInfo.endCursor;

    fetchMore({
      variables: {
        first,
        after: endCursor,
      },
    });
  }, [data?.playlists?.pageInfo.endCursor, fetchMore]);

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      <Stack align="horizontal">
        <List playlists={playlists} />
      </Stack>
      <Stack align="horizontal">
        {hasNextPage && (
          <Button variant="button" onClick={loadMore}>
            Load more
          </Button>
        )}
      </Stack>
    </Page>
  );
}

function extractPlaylists(data: FetchPlaylistsQuery | undefined) {
  if (data == null) {
    return [];
  }

  const nodes = [];
  const edges = data?.playlists?.edges ?? [];

  for (const edge of edges) {
    if (edge?.node != null) {
      nodes.push({
        id: edge.node.id,
        name: edge.node.name,
      });
    }
  }

  return nodes;
}