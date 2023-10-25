import { makeAutoObservable } from "mobx";
import Position from "../algorithm/basicClasses/positionClass";

class Obstacles {
  obstacles: Position[] = [];
  areObstaclesSubmitted: boolean = true;
  constructor() {
    makeAutoObservable(this);
  }

  addObstacle(x: number, y: number) {
    if (!this.areObstaclesSubmitted) {
      const newObtacle = new Position(x, y);
      this.obstacles.push(newObtacle);
    }
  }

  clearObstacles() {
    this.obstacles.length = 0;
  }

  removeObstacle(x: number, y: number) {
    this.obstacles = this.obstacles.filter(
      (item) => !(item.x === x && item.y === y)
    );
  }

  submitObstacles() {
    this.areObstaclesSubmitted = !this.areObstaclesSubmitted;
  }
}

export default new Obstacles();
