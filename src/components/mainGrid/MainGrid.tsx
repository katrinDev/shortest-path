import { Grid, AutoSizer } from "react-virtualized";
import { useRef, useState } from "react";
import "./MainGrid.css";
import { Container } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import startAndEndPoints from "../../store/startAndEndPoints";
import obstacles from "../../store/obstacles";

interface RenderCellProps {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: React.CSSProperties;
}


export default observer(function MainGrid() {
  const columnCount = 100;
  const rowCount = 100;
  const columnWidth = 15;
  const rowHeight = 15;

  const gridRef = useRef<Grid>(null);

  const grid = Array(rowCount)
    .fill(0)
    .map(() => Array(columnCount));

  function renderCell({ columnIndex, key, rowIndex, style }: RenderCellProps) {
    const start = startAndEndPoints.startPoint;
    const end = startAndEndPoints.endPoint;

    const isAnObtacle = obstacles.obstacles.some(
      (item) => item.x === rowIndex && item.y === columnIndex
    );

    let cellStyle =
      rowIndex === start.x && columnIndex === start.y
        ? { ...style, background: "green", border: 0 }
        : rowIndex === end.x && columnIndex === end.y
        ? { ...style, background: "#FF8210", border: 0 }
        : isAnObtacle
        ? { ...style, background: "#DF362D", border: 0 }
        : style;

    return (
      <div
        key={key}
        style={cellStyle}
        className="cell"
        onClick={() => onCellClick(rowIndex, columnIndex, style)}
      ></div>
    );
  }

  const onCellClick = (
    rowIndex: number,
    columnIndex: number,
    style: React.CSSProperties
  ) => {
    let cellRerender: boolean = false;
    let color: string = "";

    if (!startAndEndPoints.isStartSubmitted) {
      startAndEndPoints.changeStartPoint(rowIndex, columnIndex);

      cellRerender = true;
    } else if (!startAndEndPoints.isEndSubmitted) {
      startAndEndPoints.changeEndPoint(rowIndex, columnIndex);

      cellRerender = true;
    } else if (!obstacles.areObstaclesSubmitted) {
      const alreadyAnObtacle = obstacles.obstacles.some(
        (item) => item.x === rowIndex && item.y === columnIndex
      );

      alreadyAnObtacle
        ? obstacles.removeObstacle(rowIndex, columnIndex)
        : obstacles.addObstacle(rowIndex, columnIndex);

      cellRerender = true;
    }

    if (cellRerender) {
      gridRef.current?.recomputeGridSize({ rowIndex, columnIndex });
      gridRef.current?.forceUpdate();
    }
  };

  return (
    <>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <div className="list">
          <AutoSizer>
            {({ width, height }) => (
              <Grid
                ref={gridRef}
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
      </Container>
    </>
  );
});
