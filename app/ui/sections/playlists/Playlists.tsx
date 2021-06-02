import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading, Hr, Page } from 'components';

import { usePlaylistsQueryQuery } from './graphql/playlists';
import './Playlists.css';

interface Parameters {
  first: number | null;
  last: number | null;
  after: string | undefined;
  before: string | undefined;
}

const numberOfPlaylists = 6;

export default function Playlists() {
  const { t } = useTranslation();
  const [parameters, setParameters] = React.useState<Parameters>({
    first: numberOfPlaylists,
    last: null,
    after: undefined,
    before: undefined,
  });

  let { loading, data } = usePlaylistsQueryQuery({
    variables: parameters,
  });

  let playlists = <p>Loading...</p>;

  if (!loading) {
    const playlistsLi = data?.playlists?.edges?.map((playlist) => (
      <li key={playlist?.node?.id}>
        <span>{playlist?.node?.id}</span> <span>{playlist?.node?.name}</span>
      </li>
    ));

    playlists = (
      <section>
        <ul>{playlistsLi}</ul>
        <button
          onClick={() => {
            if (data?.playlists?.pageInfo.hasPreviousPage) {
              setParameters({
                first: null,
                last: numberOfPlaylists,
                after: '',
                before: data?.playlists?.pageInfo.startCursor || undefined,
              });
            }
          }}
          disabled={!data?.playlists?.pageInfo.hasPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (data?.playlists?.pageInfo.hasNextPage) {
              setParameters({
                first: numberOfPlaylists,
                last: null,
                after: data?.playlists?.pageInfo.endCursor || undefined,
                before: '',
              });
            }
          }}
          disabled={!data?.playlists?.pageInfo.hasNextPage}
        >
          Next
        </button>
      </section>
    );
  }

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      <p>Playlists anyone?</p>
      {playlists}
    </Page>
  );
}
