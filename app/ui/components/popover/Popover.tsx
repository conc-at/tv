import React, { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ActionList } from '../actionlist';

type ActionListItem = {
  content: string;
  onAction: (index: number) => void;
};

type Props = {
  activator: ReactNode;
  dismiss?: () => void;
  items: ActionListItem[];
  show: boolean;
};

const Container = styled.div`
  position: relative;

  > div:last-child {
    position: absolute;
  }
`;

export function Popover({ activator, dismiss, items, show }: Props) {
  const popover = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cb = (evt: MouseEvent) => {
      const node = popover.current;
      if (node == null) {
        return;
      }

      if (node.contains(evt.target as Node)) {
        return;
      }

      dismiss && dismiss();
    };

    document.addEventListener('click', cb);
    return () => document.removeEventListener('click', cb);
  }, [dismiss]);

  return (
    <Container ref={popover}>
      {activator}
      {show && <ActionList items={items} />}
    </Container>
  );
}
