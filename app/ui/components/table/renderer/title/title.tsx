import React from 'react';
// eslint-disable-next-line import/named
import { TableCellProps } from 'react-virtualized';

export function title({ cellData }: TableCellProps) {
  if (cellData == null) {
    return '';
  }

  return <p>{cellData}</p>;
}
