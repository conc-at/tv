import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1.5rem;
  position: absolute;
  right: 0.15rem;
  top: 0;
  vertical-align: middle;

  &:hover {
    color: red;
  }
`;

type Props = {
  onDismiss?: () => void;
};

export function Close({ onDismiss }: Props) {
  return <StyledButton onClick={onDismiss}>×</StyledButton>;
}
