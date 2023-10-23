import Node from "./nodeClass";
import Position from "./position";

export function aStarAlgorithm(
  grid: number[][],
  startPosition: Position,
  endPosition: Position
) {
  let startNode = new Node(startPosition, null);
  let endNode = new Node(endPosition, null);

  let openList: Node[] = [];
  let closedList: Node[] = [];

  openList.push(startNode);

  while (openList.length > 0) {
    let currentNode = openList[0];
    let currentIndex = 0;

    for (let index = 0; index < openList.length; index++) {
      if (openList[index].f < currentNode.f) {
        currentNode = openList[index];
        currentIndex = index;
      }
    }

    openList.splice(currentIndex, 1);

    closedList.push(currentNode);

    if (currentNode.equals(endNode)) {
      let path: Position[] = [];
      let current: Node | null = currentNode;
      while (current) {
        path.push(current.position);
        current = current.parent;
      }
      return path.reverse();
    }

    let children: Node[] = [];
    let positions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (let position of positions) {
      let childPosition = new Position(
        currentNode.position.x + position[0],
        currentNode.position.y + position[1]
      );

      if (
        childPosition.x < 0 ||
        childPosition.x >= grid.length ||
        childPosition.y < 0 ||
        childPosition.y >= grid[0].length
      ) {
        continue;
      }

      if (grid[childPosition.x][childPosition.y] === 1) {
        continue;
      }

      let childNode = new Node(childPosition, currentNode);

      children.push(childNode);
    }

    for (let child of children) {
      if (closedList.some((closedChild) => child.equals(closedChild))) {
        continue;
      }

      child.g = currentNode.g + 1;
      child.h = Node.calculateH(child, endNode);
      child.setF();

      if (
        !openList.some(
          (openMode) => child.equals(openMode) && child.g >= openMode.g
        )
      ) {
        openList.push(child);
      }
    }
  }

  return null;
}
