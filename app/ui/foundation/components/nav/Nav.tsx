import React from 'react';

import { useTranslation } from 'react-i18next';

import { Bar, Item, Section } from './components';

export function Nav() {
  const { t } = useTranslation();

  return (
    <Bar>
      <Section>
        <Item to="/home">{t('nav.item.profile')}</Item>
        <Item to="/playlists">{t('nav.item.playlists')}</Item>
      </Section>
    </Bar>
  );
}
