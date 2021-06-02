import React from 'react';
// eslint-disable-next-line import/named
import { TableCellProps } from 'react-virtualized';
import { Link } from 'react-router-dom';

interface Config {
  external?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderLink?: (value: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderText?: (value: any) => string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noop = (value: any) => value;

export function link({
  external = false,
  renderLink = noop,
  renderText = noop,
  ...props
}: Config = {}) {
  return function linkCellRenderer({ cellData }: TableCellProps) {
    if (cellData == null) {
      return '';
    }

    if (external) {
      return (
        <a href={renderLink(cellData)} {...props} rel="nofollow">
          {renderText(cellData)}
        </a>
      );
    }

    const to = renderLink(cellData);
    const text = renderText(cellData);

    return (
      <Link to={to} {...props}>
        {text}
      </Link>
    );
  };
}
