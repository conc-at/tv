import styled from 'styled-components';

import { Box } from 'components';

export const Content = styled(Box)`
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.5);
  left: 50%;
  max-width: 80vw;
  padding: 2rem 1rem 1rem 1rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10010;
`;
