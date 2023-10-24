import { Grid, AutoSizer } from "react-virtualized";
import { useState } from "react";
import "./MainGrid.css";
import Position from "../../algorithm/basicClasses/positionClass";
import Button from "@material-ui/core/Button";
import { Box, Container, Typography } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";
import HideAppBar from "../appBar/HideAppBar";
import ButtonsHeader from "../buttonsHeader/ButtonsHeader";

interface RenderCellProps {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: React.CSSProperties;
}

export default function MainGrid() {
  const columnCount = 100;
  const rowCount = 100;
  const columnWidth = 15;
  const rowHeight = 15;

  const grid = Array(rowCount)
    .fill(0)
    .map(() => Array(columnCount));

  const [cellsStyles, setCellsStyles] = useState<{
    [position: string]: React.CSSProperties;
  }>({});
  const [startPoint, setStartPoint] = useState<Position>(new Position(0, 0));
  const [endPoint, setEndPoint] = useState<Position>(new Position(99, 99));

  const onCellClick = (
    rowIndex: number,
    columnIndex: number,
    style: Object
  ) => {
    setStartPoint(new Position(rowIndex, columnIndex));

    console.log({ startPoint });

    setCellsStyles(() => ({
      ...cellsStyles,
      [`${rowIndex}-${columnIndex}`]: { ...style, backgroundColor: "green" },
    }));

    // setCellsStyles(() => {
    //   const entries = Object.entries(cellsStyles);

    //   const changedEntries = entries.map(([key, value]) => {
    //     if (key === `${rowIndex}-${columnIndex}`) {
    //       console.log(key);
    //       return [key, { ...style, backgroundColor: "green" }];
    //     } else {
    //       if (value.backgroundColor) {
    //         const { backgroundColor, ...rest } = value;
    //         return [key, rest];
    //       } else {
    //         return [key, value];
    //       }
    //     }
    //   });

    //   return Object.fromEntries(changedEntries);
    // });
  };

  function renderCell({ columnIndex, key, rowIndex, style }: RenderCellProps) {
    const cellStyle = cellsStyles[`${rowIndex}-${columnIndex}`] || style;

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
    <>
      <Container component="main">
        <ButtonsHeader startPoint={startPoint} endPoint={endPoint} />
        <Container style={{ display: "flex", justifyContent: "center" }}>
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
        </Container>
      </Container>
    </>
  );
}
