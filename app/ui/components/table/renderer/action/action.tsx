import React from 'react';
// eslint-disable-next-line import/named
import { TableCellProps } from 'react-virtualized';

interface Config {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (evt: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderText?: (value: any) => string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noop = (value: any) => value;

export function action({
  onClick = noop,
  renderText = noop,
  ...props
}: Config = {}) {
  return function actionCellRenderer({ cellData }: TableCellProps) {
    if (cellData == null) {
      return '';
    }

    const text = renderText(cellData);

    return (
      <a onClick={() => onClick(cellData)} {...props}>
        {text}
      </a>
    );
  };
}
