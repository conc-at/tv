import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1.5rem;
  position: absolute;
  right: 0;
  top: 0;
  vertical-align: middle;
`;

type Props = {
  onDismiss?: () => void;
};

export function Close({ onDismiss }: Props) {
  return <StyledButton onClick={onDismiss}>×</StyledButton>;
}
