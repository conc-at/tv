import React from 'react';
// eslint-disable-next-line import/named
import { TableCellProps } from 'react-virtualized';

import { Dot } from 'components';

export function state({ cellData }: TableCellProps) {
  const color = cellData === 'success' ? 'green' : 'red';
  return <Dot color={color} />;
}
