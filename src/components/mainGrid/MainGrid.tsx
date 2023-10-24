import { Grid, AutoSizer } from "react-virtualized";
import { useState } from "react";
import "./MainGrid.css";
import Position from "../../algorithm/basicClasses/positionClass";
import Button from "@material-ui/core/Button";
import { Box, Container, Typography } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";
import HideAppBar from "../appBar/HideAppBar";
import ButtonsHeader from "../buttonsHeader/ButtonsHeader";
import { arrayBuffer } from "stream/consumers";

interface RenderCellProps {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: React.CSSProperties;
}

type CellsStyles = {
  position: string;
  cellStyle: React.CSSProperties;
}[];

export default function MainGrid() {
  const columnCount = 100;
  const rowCount = 100;
  const columnWidth = 15;
  const rowHeight = 15;

  const grid = Array(rowCount)
    .fill(0)
    .map(() => Array(columnCount));

  const [cellsStyles, setCellsStyles] = useState<CellsStyles>([]);
  const [startPoint, setStartPoint] = useState<Position>(new Position(0, 0));
  const [endPoint, setEndPoint] = useState<Position>(new Position(99, 99));

  const changeStyles = (
    rowIndex: number,
    columnIndex: number,
    style: React.CSSProperties
  ) => {
    const isExists = cellsStyles.some(
      (item) => item.position === `${rowIndex}-${columnIndex}`
    );
    let newStylesArray: CellsStyles = cellsStyles;
    if (!isExists) {
      cellsStyles.push({
        position: `${rowIndex}-${columnIndex}`,
        cellStyle: { ...style, background: "green" },
      });
    }

    newStylesArray = cellsStyles;

    newStylesArray = newStylesArray.map((item) => {
      if (
        item.position !== `${rowIndex}-${columnIndex}` &&
        item.cellStyle.background
      ) {
        const { background, ...rest } = item.cellStyle;
        return {
          ...item,
          cellStyle: rest,
        };
      } else {
        return item;
      }
    });
    setCellsStyles(() => newStylesArray);
  };

  const onCellClick = (
    rowIndex: number,
    columnIndex: number,
    style: React.CSSProperties
  ) => {
    setStartPoint(new Position(rowIndex, columnIndex));

    console.log({ startPoint });

    changeStyles(rowIndex, columnIndex, style);
  };

  function renderCell({ columnIndex, key, rowIndex, style }: RenderCellProps) {
    const cellStyle =
      cellsStyles.find((item) => item.position === `${rowIndex}-${columnIndex}`)
        ?.cellStyle || style;

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
