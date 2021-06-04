import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Heading, Hr, Page } from 'components';
import {
  PlaylistsQueryVariables,
  usePlaylistsQuery,
} from 'sections/playlists/graphql/playlists';
import { PageInfo } from '../../types';

const numberShownPlaylists = 5;

export function Playlists() {
  const { t } = useTranslation();
  const [queryVariables, setQueryVariables] =
    React.useState<PlaylistsQueryVariables>({ first: numberShownPlaylists });

  const { data, loading, error } = usePlaylistsQuery({
    variables: queryVariables,
  });

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setQueryVariables({
        last: numberShownPlaylists,
        before: data?.playlists?.pageInfo.startCursor,
      });
    } else if (direction === 'next') {
      setQueryVariables({
        first: numberShownPlaylists,
        after: data?.playlists?.pageInfo.endCursor,
      });
    }
  };

  if (loading) {
    return 'Loading ...';
  }

  if (error) {
    return 'An Error occured. Try again later';
  }

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      <ul>
        {data?.playlists?.edges?.map((edge) => {
          return <li key={edge?.node?.id}>{edge?.node?.name}</li>;
        })}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {data?.playlists?.pageInfo.hasPreviousPage && (
          <Button onClick={() => handlePageChange('prev')}>
            Previous Page
          </Button>
        )}

        {data?.playlists?.pageInfo.hasNextPage && (
          <Button onClick={() => handlePageChange('next')}>Next Page</Button>
        )}
      </div>
    </Page>
  );
}
