import { Grid, AutoSizer } from "react-virtualized";
import { useState } from "react";
import "./MainGrid.css";
import Position from "../../algorithm/basicClasses/positionClass";

interface RenderCellProps {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: React.CSSProperties;
}

export default function MainGrid() {
  const columnCount = 100;
  const rowCount = 100;
  const columnWidth = 10;
  const rowHeight = 10;

  const grid = Array(rowCount)
    .fill(0)
    .map(() => Array(columnCount));

  const [cellsStyles, setCellsStyles] = useState<{
    [position: string]: React.CSSProperties;
  }>({});
  const [startPoint, setStartPoint] = useState<Position>();

  const onCellClick = (
    rowIndex: number,
    columnIndex: number,
    style: Object
  ) => {
    setStartPoint(new Position(rowIndex, columnIndex));

    console.log(`Start Point: ${startPoint}`);
    setCellsStyles(() => ({
      ...cellsStyles,
      [`${rowIndex}-${columnIndex}`]: { ...style, backgroundColor: "green" },
    }));
  };

  function renderCell({ columnIndex, key, rowIndex, style }: RenderCellProps) {
    const cellStyle = cellsStyles[`${rowIndex}-${columnIndex}`] || style;
    console.log({ style, cellStyle });

    return (
      <div
        key={key}
        style={cellStyle}
        className="cell"
        onClick={() => onCellClick(rowIndex, columnIndex, style)}
      ></div>
    );
  }

  return (
    <div className="list">
      <AutoSizer>
        {({ width, height }) => (
          <Grid
            width={width}
            height={height}
            rowHeight={rowHeight}
            columnWidth={columnWidth}
            cellRenderer={renderCell}
            rowCount={grid.length}
            columnCount={grid[0].length}
          />
        )}
      </AutoSizer>
    </div>
  );
}
