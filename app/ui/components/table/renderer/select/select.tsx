import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any,import/named
import { TableCellProps } from 'react-virtualized';

type SelectCellProps = TableCellProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectCell: (evt: any) => void;
};

function SelectCell({ cellData, selectCell }: SelectCellProps) {
  return (
    <input
      type="checkbox"
      name="selected"
      value={cellData}
      onClick={selectCell}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function select(selectCell: (item: any) => void) {
  // eslint-disable-next-line react/display-name
  return function selectCellRenderer(props: TableCellProps) {
    return <SelectCell {...props} selectCell={selectCell} />;
  };
}
