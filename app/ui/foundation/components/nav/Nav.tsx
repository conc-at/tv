import React from 'react';

import { useTranslation } from 'react-i18next';

import { Bar, Item, Section } from './components';

export function Nav() {
  const { t } = useTranslation();

  return (
    <Bar>
      <Section>
        <Item to="/…">…</Item>
        <Item to="/home">Home</Item>
        <Item to="/playlists">Playlists</Item>
      </Section>
    </Bar>
  );
}
