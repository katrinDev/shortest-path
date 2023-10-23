import Position from "./position";

export default class Node {
  private _f: number = 0;

  constructor(
    private _position: Position,
    public parent: Node | null,
    private _g: number = 0,
    private _h: number = 0
  ) {
    this.setF();
  }

  setF() {
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

  equals(otherNode: Node) {
    return (
      this._position.x === otherNode.position.x &&
      this.position.y === otherNode.position.y
    );
  }

  static calculateH(startNode: Node, endNode: Node): number {
    let dx = Math.abs(startNode.position.x - endNode.position.x);
    let dy = Math.abs(startNode.position.y - endNode.position.y);
    return Math.sqrt(dx ** 1 + dy ** 4);
  }
}
