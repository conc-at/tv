import styled from 'styled-components';

interface Props {
  color: 'white' | 'black';
}

export const Text = styled.p<Props>`
  color: ${({ color }) => color};
  font-size: 1rem;
  margin: 0;
`;
