import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePlaylistsQuery } from './graphql/playlists';
import { Button, Heading, Hr, Page } from 'components';

export default function Playlists() {
  const { t } = useTranslation();

  const { data, loading, error, fetchMore } = usePlaylistsQuery({
    variables: {
      n: 5,
    },
  });
  console.log(data);
  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      <Button
        onClick={() => {
          fetchMore({
            variables: {
              n: 5,
              after: data?.playlists?.pageInfo.endCursor,
            },
          }).then((result) => {
            console.log(result)
          })
        }}
      >
        Next
      </Button>
    </Page>
  );
}
