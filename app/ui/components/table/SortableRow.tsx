import React, { useRef } from 'react';

import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd';
// eslint-disable-next-line import/named
import { TableRowProps } from 'react-virtualized';

type RowProps = TableRowProps & {
  dropRow?: (item: SortItem) => void;
  moveRow?: (dragIndex: number, hoverIndex: number) => void;
};

export type SortItem = {
  id: string;
  index: number;
  type: string;
};

export function SortableRow({
  className,
  columns,
  dropRow,
  index,
  moveRow,
  rowData,
  style,
}: RowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'row',
    hover(item: SortItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow && moveRow(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ opacity }, drag] = useDrag({
    item: { type: 'row', id: rowData.id, index },
    end: (item: SortItem | undefined) => item && dropRow && dropRow(item),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={className}
      role="row"
      style={{ opacity, ...style, backgroundColor: 'white' }}
    >
      {columns}
    </div>
  );
}
