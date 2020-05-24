import React from 'react';

import { useTranslation } from 'react-i18next';

import { Bar, Item, Section } from './components';

export function Nav() {
  const { t } = useTranslation();

  return (
    <Bar>
      <Section>
        <Item to="/…">…</Item>
      </Section>
    </Bar>
  );
}
