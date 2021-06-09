import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import { Button, Link } from 'components';
import { LinkProps } from 'react-router-dom';

const NavLink = styled(Link)`
  color: white;
  display: inline-block;
  padding: 0.5rem;
  transition: all 99ms ease-out;

  &:hover {
    background-color: lightblue;
    color: black;
  }
`;

const NavButton = styled(Button)`
  border: none;
  color: white;
  display: inline-block;
  outline: none;
  padding: 0.5rem;
  text-decoration: underline;
  transition: all 99ms ease-out;

  &:hover {
    background-color: lightblue;
    color: black;
  }
`;

type ButtonProps = { onClick?: (evt: MouseEvent) => void };
type Props = LinkProps | ButtonProps;

function isLink(props: Props): props is LinkProps {
  return 'to' in props;
}

export function Item(props: Props) {
  if (isLink(props)) {
    return <NavLink {...props} />;
  }

  return <NavButton variant="link" {...props} />;
}
