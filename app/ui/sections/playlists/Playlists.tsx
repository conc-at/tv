import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Heading, Hr, Page } from 'components';
import {
  PlaylistsQueryVariables,
  usePlaylistsQuery,
} from './graphql/playlists';

export default function Playlists() {
  const { t } = useTranslation();
  const [variables, setVariables] = useState<PlaylistsQueryVariables>({
    first: 3,
  });
  const { data, loading, error } = usePlaylistsQuery({
    variables,
  });
  const onPrevious = () => {
    setVariables({
      last: 3,
      before: data?.playlists?.pageInfo.startCursor,
    });
  };
  const onNext = () => {
    setVariables({
      first: 3,
      after: data?.playlists?.pageInfo.endCursor,
    });
  };

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <>
          <ul>
            {data?.playlists?.edges?.map((edge) => (
              <li key={edge?.node?.id}>{edge?.node?.name}</li>
            ))}
          </ul>
          {data?.playlists?.pageInfo.hasPreviousPage ? (
            <Button onClick={onPrevious}>Previous</Button>
          ) : null}
          {data?.playlists?.pageInfo.hasNextPage ? (
            <Button onClick={onNext}>Next</Button>
          ) : null}
        </>
      )}
    </Page>
  );
}
