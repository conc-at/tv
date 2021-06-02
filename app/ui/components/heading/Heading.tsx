import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Props = PropsWithChildren<{
  variant: Variant;
}>;

const elements: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const heading = new Map(
  elements.reverse().map((element, index) => {
    const Component = styled(element)`
      font-weight: bold;
      font-size: ${0.5 * (index + 1)}rem;
      margin: 0;
    `;
    return [element, Component];
  }),
);

export function Heading({ variant, ...props }: Props) {
  const Component = heading.get(variant);
  return Component ? <Component {...props} /> : null;
}
