import { Heading } from 'components/heading';
import { Hr } from 'components/hr';
import { Page } from 'components/page';
import React from 'react';

export function Home() {
  return (
    <Page>
      <Heading variant="h1">Hello there!</Heading>
      <Hr />
    </Page>
  );
}
