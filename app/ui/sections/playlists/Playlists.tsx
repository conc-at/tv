import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading, Hr, Page } from 'components';

export default function Playlists() {
  const { t } = useTranslation();

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      <p>Playlists anyone?</p>
    </Page>
  );
}
