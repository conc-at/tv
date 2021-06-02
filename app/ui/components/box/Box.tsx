import { ReactNode } from 'react';
import styled from 'styled-components';

import { Size, sizes } from 'utilities';

export type BoxProps = {
  background?: string;
  children: ReactNode;
  padding?: Size;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
};

export const Box = styled.div<BoxProps>`
  flex: 1 0 auto;
  padding: ${({ padding }) => (padding && sizes.get(padding)) ?? 0}rem;
  position: relative;
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  background-color: ${({ background }) => background};
`;
