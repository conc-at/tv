import React from 'react';

import { useTranslation } from 'react-i18next';

import { Bar, Item, Section } from './components';

export function Nav() {
  const { t } = useTranslation();

  return (
    <Bar>
      <Section>
        <Item to="/playlists">Playlists</Item>
        <Item to="/home">Home</Item>
      </Section>
    </Bar>
  );
}
