import React, { useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line import/named
import { ColumnProps, Index, TableRowProps } from 'react-virtualized';
import update from 'immutability-helper';

import { SortableRow } from './SortableRow';
import { Table } from './Table';

type Row = {
  id: string;
};

export type TableProps<T extends Row> = {
  children: React.ReactElement<ColumnProps>[] | React.ReactElement<ColumnProps>;
  data: T[];
  dropRow?: (item: Row) => void;
  height: number;
  noRowsRenderer?: () => JSX.Element | null;
  width: number;
};

export function SortableTable<T extends Row>({
  children,
  data,
  dropRow,
  height,
  noRowsRenderer,
  width,
}: TableProps<T>) {
  const [rows, setRows] = useState(data);
  useEffect(() => setRows(data), [data]);

  const handleMoveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = rows[dragIndex];
      setRows(
        update(rows, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [rows],
  );

  return (
    <Table
      headerHeight={30}
      height={height}
      noRowsRenderer={noRowsRenderer}
      rowCount={rows.length}
      rowHeight={30}
      rowGetter={({ index }: Index) => rows[index]}
      rowRenderer={(props: TableRowProps) => (
        <SortableRow
          {...props}
          key={props.rowData.id}
          dropRow={dropRow}
          moveRow={handleMoveRow}
        />
      )}
      width={width}
    >
      {children}
    </Table>
  );
}
