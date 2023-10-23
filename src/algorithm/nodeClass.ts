import Position from "./position";

export class Node {
  private _f: number = 0;

  constructor(
    public parent: Node,
    private _position: Position,
    private _g: number = 0,
    private _h: number = 0
  ) {
    this.setF();
  }

  private setF() {
    this._f = this._g + this._h;
  }

  get f(): number {
    return this._f;
  }

  set g(value: number) {
    if (value < 0) throw new Error("Negative g value ");
    this._g = value;
  }

  get g(): number {
    return this._g;
  }

  set h(value: number) {
    if (value < 0) throw new Error("Negative h value ");
    this._h = value;
  }

  get h(): number {
    return this._h;
  }

  set position(value: Position) {
    if (value.x < 0 || value.y < 0)
      throw new Error("Negative values for position");
    this._position = value;
  }

  get position(): Position {
    return this._position;
  }

  equals(otherPosition: Position) {
    return (
      this._position.x === otherPosition.x &&
      this.position.y === otherPosition.y
    );
  }
}
