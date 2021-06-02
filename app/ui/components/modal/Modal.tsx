import React, { PropsWithChildren } from 'react';

import { Background, Close, Content } from './components';

type Props = PropsWithChildren<{
  onDismiss?: () => void;
  visible?: boolean;
}>;

export function Modal({ children, onDismiss, visible = false }: Props) {
  if (!visible) {
    return null;
  }

  return (
    <>
      <Content background="white">
        <Close onDismiss={onDismiss} />
        {children}
      </Content>
      <Background onClick={onDismiss} />
    </>
  );
}
