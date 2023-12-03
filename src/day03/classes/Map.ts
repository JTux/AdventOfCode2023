import { EOL } from "os";

export default class Map {
  public readonly rows: Row[];

  constructor(input: string) {
    const lines = input.split(EOL);

    this.rows = lines.map(
      (line, rowIndex) => new Row(`${line}.`, rowIndex)
    );
  }

  public get symbols() {
    return this.rows.flatMap(r =>
      r.cells.filter(c =>
        c.type === "Symbol"
      )
    );
  }

  public get cells() {
    return this.rows.flatMap(r => r.cells);
  }
}

export class Row {
  public readonly rowIndex: number;
  public readonly cells: Cell[]

  constructor(line: string, rowIndex: number) {
    this.rowIndex = rowIndex;
    this.cells = [...line].map(
      (c, columnIndex) => new Cell(c, columnIndex, rowIndex)
    );
  }

  public getCellAt(x: number, y: number): Cell | undefined {
    const cell = this.cells.filter(c =>
      c.coords.x === x && c.coords.y === y
    );

    return cell.length > 0 ? cell[0] : undefined;
  }
}

export class Cell {
  private _type: CellType;
  private _sets = {
    numbers: "0123456789",
    period: "."
  }

  public readonly coords: Coords;
  public readonly value: string;

  constructor(character: string, x: number, y: number) {
    this.type = character;
    this.coords = new Coords(x, y);
    this.value = character;
  }

  public get type(): CellType {
    return this._type;
  }
  public set type(character: string) {
    if (this._sets.numbers.includes(character)) {
      this._type = "Number";
    } else if (this._sets.period.includes(character)) {
      this._type = "Period"
    } else {
      this._type = "Symbol";
    }
  }
}

export class Coords {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public get neighbors(): Coords[] {
    let neighbors: Coords[] = [];

    for (let i = 0; i < 9; i++) {
      if (i == 4) continue;

      const x = -1 + (i % 3);
      const y = -1 + Math.floor(i / 3);

      neighbors.push(new Coords(x + this.x, y + this.y));
    }

    return neighbors;
  }
}

type CellType = "Number" | "Period" | "Symbol" | undefined;
