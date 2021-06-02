import React from 'react';

import { Button } from './components';

type Props = {
  onClick?: () => void;
};

export function Close({ onClick }: Props) {
  return <Button onClick={onClick}>×</Button>;
}
