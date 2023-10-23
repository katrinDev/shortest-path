import { aStarAlgorithm } from "./aStarAlgorithm";
import Position from "./positionClass";

export default function executeAlgorithm(
  grid: number[][],
  startPoint: Position,
  endPoint: Position
) {
  const start = performance.now();

  const resultPositions = aStarAlgorithm(grid, startPoint, endPoint);

  const end = performance.now();

  const timeTaken = end - start;

  const result = resultPositions?.map((pos) => [pos.x, pos.y]);

  return { result, timeTaken };
}
