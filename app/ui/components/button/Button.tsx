import styled, { css } from 'styled-components';

type Variant = 'button' | 'link';

type Props = {
  variant?: Variant;
};

const variants = new Map([
  ['link', css``],
  [
    'button',
    css`
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

export const Button = styled.button<Props>`
  ${({ variant }) => variants.get(variant === 'link' ? 'link' : 'button')}
`;
