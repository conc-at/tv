import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

import { sizes } from 'utilities';

import { Box, Text } from '../';

import { Close } from './components';

const TIMER_DURATION = 5000;

type Props = {
  autoClose?: boolean;
  onDismiss?(): void;
  status?: 'success' | 'error';
  text: string;
};

const colors = new Map([
  ['success', 'green'],
  ['error', '#990033'],
  ['default', 'turquoise'],
]);

const StyledPanel = styled(Box)`
  bottom: 2rem;
  border-radius: ${sizes.get('xs')}rem;
  left: 50%;
  max-width: 80%;
  position: fixed;
  transform: translateX(-50%);
  width: 400px;
`;

export function Toast({
  autoClose = true,
  onDismiss,
  status = 'success',
  text,
}: Props) {
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current && clearTimeout(timer.current);

    if (autoClose) {
      timer.current = setTimeout(onDismiss, TIMER_DURATION);
    }

    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [autoClose, onDismiss]);

  const color = colors.get(status);

  return (
    <StyledPanel background={color} padding="xs">
      <Close onDismiss={onDismiss} />
      <Text color="white">{text}</Text>
    </StyledPanel>
  );
}
