import { Grid, AutoSizer } from "react-virtualized";
import { useContext, useRef, useState } from "react";
import "./MainGrid.css";
import { Container, Snackbar } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";
import { observer } from "mobx-react-lite";
import startAndEndPoints from "../../store/startAndEndPoints";
import obstacles from "../../store/obstacles";
import executeAlgorithm from "../../algorithm/algorithmTimeCounter";
import Position from "../../algorithm/basicClasses/positionClass";
import { AlertsContext } from "../../context/alertsContext";

interface RenderCellProps {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: React.CSSProperties;
}

let graphicalPath: (path: Position[] | null, time: number) => void;
export let clearObstacles: () => void;
export let resetGrid: () => void;

export default observer(function MainGrid() {
  const columnCount = 100;
  const rowCount = 100;
  const columnWidth = 15;
  const rowHeight = 15;

  const gridRef = useRef<Grid>(null);
  const [resultPath, setResultPath] = useState<Position[] | null>([]);
  const { snackbarProps, setSnackbarProps } = useContext(AlertsContext);

  const grid = Array(rowCount)
    .fill(0)
    .map(() => Array(columnCount));

  graphicalPath = (path: Position[] | null, time: number) => {
    try {
      if (path === null) {
        throw new Error("Impossible to build a path");
      }

      setResultPath(path);

      rerenderCellsOfArray(path);

      setSnackbarProps(() => ({
        open: true,
        severity: "info",
        message: `This path construction took ${time.toFixed(2)} ms`,
      }));
    } catch (err: any) {
      console.log(err);

      setSnackbarProps(() => ({
        open: true,
        severity: "error",
        message: `${err.message}`,
      }));
    }
  };

  clearObstacles = () => {
    const obstaclesArray = obstacles.obstacles.slice();
    console.log(JSON.stringify(obstaclesArray));
    obstacles.clearObstacles();

    console.log(JSON.stringify(obstaclesArray));

    rerenderCellsOfArray(obstaclesArray);
  };

  resetGrid = () => {
    const oldPath = resultPath;
    setResultPath([]);

    rerenderCellsOfArray(oldPath);

    clearObstacles();

    const oldStart = startAndEndPoints.startPoint;
    startAndEndPoints.changeStartPoint(0, 0);
    const newStart = startAndEndPoints.startPoint;

    const oldEnd = startAndEndPoints.endPoint;
    startAndEndPoints.changeEndPoint(99, 99);
    const newEnd = startAndEndPoints.endPoint;

    const rerenderCellsArray = [];
    rerenderCellsArray.push(oldStart, newStart, oldEnd, newEnd);

    rerenderCellsOfArray(rerenderCellsArray);
  };

  const rerenderCellsOfArray = (positions: Position[] | null): void => {
    positions?.forEach((point) => {
      gridRef.current?.recomputeGridSize({
        rowIndex: point.x,
        columnIndex: point.y,
      });
      gridRef.current?.forceUpdate();
    });
  };

  function renderCell({ columnIndex, key, rowIndex, style }: RenderCellProps) {
    const start = startAndEndPoints.startPoint;
    const end = startAndEndPoints.endPoint;

    const isAnObstacle = obstacles.obstacles.some(
      (item) => item.x === rowIndex && item.y === columnIndex
    );

    const isPathPart = resultPath?.some(
      (item) => item.x === rowIndex && item.y === columnIndex
    );

    let cellStyle =
      rowIndex === start.x && columnIndex === start.y
        ? { ...style, background: "green", border: 0 }
        : rowIndex === end.x && columnIndex === end.y
        ? { ...style, background: "#FF8210", border: 0 }
        : isAnObstacle
        ? { ...style, background: "#DF362D", border: 0 }
        : isPathPart
        ? { ...style, background: "#59981A", border: 0 }
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

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarProps(() => ({ ...snackbarProps, open: false }));
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
        {
          <Snackbar
            open={snackbarProps.open}
            autoHideDuration={7000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              variant="filled"
              severity={snackbarProps.severity}
              style={{ width: "100%", fontSize: "medium", fontWeight: "bold" }}
            >
              {snackbarProps.message}
            </Alert>
          </Snackbar>
        }
      </Container>
    </>
  );
});

export const buildPath = () => {
  const start = startAndEndPoints.startPoint;
  const end = startAndEndPoints.endPoint;
  const obstaclesArray = obstacles.obstacles;

  let grid = [];

  for (let i = 0; i < 100; i++) {
    let row = [];
    for (let j = 0; j < 100; j++) {
      const isObstacle = obstaclesArray.some(
        (item) => item.x === i && item.y === j
      );
      row.push(isObstacle ? 1 : 0);
    }
    grid.push(row);
  }

  const { result: path, timeTaken: time } = executeAlgorithm(grid, start, end);

  console.log({ path, time });

  graphicalPath(path, time);
};
