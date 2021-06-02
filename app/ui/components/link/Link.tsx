import React, { ComponentType } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

type Variant = 'button' | 'link';

type Props = {
  variant?: Variant;
} & LinkProps;

const variants = new Map<Variant, ComponentType<Props>>([
  ['link', styled(RouterLink)<Props>``],
  [
    'button',
    styled(RouterLink)<Props>`
      background-color: white;
      border: 3px solid black;
      color: black;
      font-weight: bold;
      padding: 0.25rem;
      text-align: center;
      text-decoration: none;
      transition: all 99ms ease-out;
      width: 200px;

      &:hover {
        background-color: black;
        color: white;
        cursor: pointer;
      }
    `,
  ],
]);

export function Link({ variant = 'link', ...props }: Props) {
  const Component = variants.get(variant);
  return Component ? <Component {...props} /> : null;
}
