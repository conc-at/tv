import React from 'react';

interface Config {
  message?: string;
}

export function empty({ message = 'No items found' }: Config = {}) {
  // eslint-disable-next-line react/display-name
  return function emptyCellRenderer() {
    return <p>{message}</p>;
  };
}
