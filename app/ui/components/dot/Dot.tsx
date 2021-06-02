import styled from 'styled-components';

export const Dot = styled.span`
  height: 8px;
  width: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
`;
