import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading, Hr, Page } from 'components';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Page>
      <Heading variant="h1">Page Not Found</Heading>
    </Page>
  );
}
