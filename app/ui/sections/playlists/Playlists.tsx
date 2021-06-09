import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Heading, Hr, Page, Stack } from 'components';

import { List } from './components/index';
import {
  FetchPlaylistsQuery,
  useFetchPlaylistsQuery,
} from './graphql/playlists';

export default function Playlists() {
  const { t } = useTranslation();

  const pageSize = 3;

  const { data, fetchMore } = useFetchPlaylistsQuery({
    variables: { first: pageSize },
  });
  const playlists = extractPlaylists(data);

  const hasNextPage = data?.playlists?.pageInfo.hasNextPage;
  const hasPrevPage = data?.playlists?.pageInfo.hasPreviousPage;

  const nextPage = useCallback(() => {
    const endCursor = data?.playlists?.pageInfo.endCursor;

    fetchMore({
      variables: {
        first: pageSize,
        last: undefined,
        after: endCursor,
      },
    });
  }, [data?.playlists?.pageInfo.endCursor, fetchMore]);

  const prevPage = useCallback(() => {
    const startCursor = data?.playlists?.pageInfo.startCursor;

    fetchMore({
      variables: {
        first: undefined,
        last: pageSize,
        before: startCursor,
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
        {hasPrevPage && (
          <Button variant="button" onClick={prevPage}>
            Prev Page
          </Button>
        )}
        {hasNextPage && (
          <Button variant="button" onClick={nextPage}>
            Next Page
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