import { ReactNode } from 'react';
import styled from 'styled-components';

import { sizes, Size } from 'utilities';

type Alignment = 'horizontal' | 'vertical';

type Props = {
  align: Alignment;
  children: ReactNode;
  spacing?: Size;
  layout?: number[];
};

type Rules = Record<string, Record<string, string>>;

function generateLayout(values: number[]) {
  const result: Rules = {};

  return values.reduce((layout, value, index) => {
    layout[`> *:nth-of-type(${index + 1})`] = {
      'flex-grow': `${value}`,
    };
    return layout;
  }, result);
}

export const Stack = styled.section<Props>`
  display: flex;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-direction: ${({ align }) => (align === 'horizontal' ? 'row' : 'column')};
  overflow: auto;

  & > * {
    flex-grow: 1;
    flex-shrink: 1;
    margin-right: ${({ spacing = 'xs' }) => sizes.get(spacing)}rem;
    &:last-child {
      margin-right: 0;
    }
  }

  ${({ layout }) => layout && generateLayout(layout)}
`;
