import styled from 'styled-components';

type Variant = 'primary' | 'secondary';

type Props = {
  variant?: Variant;
};

export const Section = styled.section<Props>`
  display: flex;
  align-self: ${({ variant }) =>
    variant === 'secondary' ? 'flex-end' : 'flex-start'};
`;
