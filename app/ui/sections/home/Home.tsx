import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading, Hr, Page } from 'components';

export function Home() {
  const { t } = useTranslation();

  return (
    <Page>
      <Heading variant="h1">Home</Heading>
    </Page>
  );
}
