import styled from 'styled-components';
// eslint-disable-next-line import/named
import { TableProps, Table as VirtualizedTable } from 'react-virtualized';

export const Table = styled(VirtualizedTable)<TableProps>`
  flex: 1 0 auto;
`;
