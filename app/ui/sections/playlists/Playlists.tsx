import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading, Hr, Page } from 'components';
import { useAllPlaylistsQuery } from './graphql/playlists';

interface PageInfo {
  after: string | null;
  before: string | null;
  first: number | null;
  last: number | null;
}

const perPage = 10;

export default function Playlists() {
  const { t } = useTranslation();
  const [state, setState] = React.useState<PageInfo>({
    first: perPage,
    after: null,
    last: null,
    before: null,
  });

  const { loading, error, data } = useAllPlaylistsQuery({
    variables: {
      ...state,
    },
  });

  function handleNext() {
    setState({
      first: perPage,
      after: pageInfo?.endCursor || null,
      last: null,
      before: null,
    });
  }

  function handlePrevious() {
    setState({
      first: null,
      after: null,
      last: perPage,
      before: pageInfo?.startCursor || null,
    });
  }

  const playlists = data?.playlists?.edges?.map((edge) => edge?.node);
  const pageInfo = data?.playlists?.pageInfo;

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      {loading ? (
        <div>Loading...</div>
      ) : (
        playlists?.map((playlist, index) => (
          <div key={`playlist${index}`}>{playlist?.name}</div>
        ))
      )}

      {pageInfo?.hasPreviousPage && (
        <button onClick={handlePrevious}>Previous</button>
      )}

      {pageInfo?.hasNextPage && <button onClick={handleNext}>Next</button>}
    </Page>
  );
}
