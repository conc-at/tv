import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading, Hr, Page } from 'components';
import { useQuery } from '@apollo/react-hooks';

import { usePlaylistsQueryQuery } from './graphql/playlists';

// import { playlistsQuery } from './graphql/playlists';

interface Parameters {
  first: number;
  cursor?: string;
}

const first = 6;

export default function Playlists() {
  const { t } = useTranslation();
  const [parameters, setParameters] = React.useState<Parameters>({ first });
  let { loading, error, data, fetchMore } = usePlaylistsQueryQuery({
    variables: parameters,
  });
  // data.playlist.nodes.length
  let playlists = <p>Loading...</p>;

  if (!loading) {
    console.log(data);
    // setCursor(data?.playlists?.pageInfo?.endCursor);
    const playlistsLi = data?.playlists?.edges?.map((playlist) => (
      <li key={playlist?.node?.id}>
        <span>{playlist?.node?.id}</span> <span>{playlist?.node?.name}</span>
      </li>
    ));

    return (
      <section>
        <ul>{playlistsLi}</ul>
        <button
          onClick={() => {
            if (data?.playlists?.pageInfo?.hasNextPage) {
              setParameters({
                first,
                cursor: data?.playlists?.pageInfo?.endCursor,
              });
              console.log(JSON.stringify(parameters));
            }
          }}
          disabled={!data?.playlists?.pageInfo?.hasNextPage}
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

      <main>
        {playlists}

        {/* <button
          onClick={() => {
            console.log('next');
          }}
        >
          Next
        </button> */}
      </main>
    </Page>
  );
}
