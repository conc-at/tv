import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePlaylistsQuery } from './graphql/playlists'
import { Heading, Hr, Page } from 'components';

export default function Playlists() {
  const { t } = useTranslation();

  const { data } = usePlaylistsQuery()
  console.log(data)
  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
    </Page>
  );
}
