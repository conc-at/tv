import React from 'react';
import styled from 'styled-components';

import { hash } from 'utilities';

import { Button } from '../button';

type ActionListItem = {
  content: string;
  onAction: (index: number) => void;
};

type Props = {
  items: ActionListItem[];
};

const Container = styled.div`
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.15);
`;

export function ActionList({ items }: Props) {
  return (
    <Container>
      {items.map((item, index) => (
        <Button
          variant="link"
          key={hash(item.content)}
          onClick={() => item.onAction(index)}
        >
          {item.content}
        </Button>
      ))}
    </Container>
  );
}
