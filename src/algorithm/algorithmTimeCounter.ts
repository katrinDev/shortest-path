import { aStarAlgorithm } from "./aStarAlgorithm";
import Position from "./basicClasses/positionClass";

export default function executeAlgorithm(
  grid: number[][],
  startPoint: Position,
  endPoint: Position
) {
  const start = performance.now();

  const result = aStarAlgorithm(grid, startPoint, endPoint);

  const end = performance.now();

  const timeTaken = end - start;

  return { result, timeTaken };
}
