import { makeAutoObservable } from "mobx";
import Position from "../algorithm/basicClasses/positionClass";

class StartAndEndPoints {
  startPoint = new Position(0, 0);
  endPoint = new Position(99, 99);

  isStartSubmitted: boolean = true;
  isEndSubmitted: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  changeStartPoint(x: number, y: number) {
    this.startPoint.x = x;
    this.startPoint.y = y;
  }

  changeEndPoint(x: number, y: number) {
    this.endPoint.x = x;
    this.endPoint.y = y;
  }

  submitStartPoint() {
    this.isStartSubmitted = !this.isStartSubmitted;
    console.log("isStartSubmitted: " + this.isStartSubmitted);
  }

  sumbitEndPoint() {
    this.isEndSubmitted = !this.isEndSubmitted;
  }
}

export default new StartAndEndPoints();
