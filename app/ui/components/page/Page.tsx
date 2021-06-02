import styled from 'styled-components';

import { sizes } from 'utilities';

export const Page = styled.section`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: ${sizes.get('m')}rem;
`;
