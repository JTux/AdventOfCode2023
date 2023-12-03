import { EOL } from "os";

export default class Map {
  public readonly rows: Row[];
  public readonly cells: Cell[];
  public readonly symbols: Cell[];

  constructor(input: string) {
    const lines = input.split(EOL);

    this.rows = lines.map(
      (line, rowIndex) => new Row(`${line}.`, rowIndex)
    );

    this.cells = this.rows.flatMap(r => r.cells);
    this.symbols = this.cells.filter(r => r.type === "Symbol");
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
}

export class Cell {
  public readonly type: CellType;

  public readonly coords: Coords;
  public readonly value: string;

  constructor(character: string, x: number, y: number) {
    this.coords = new Coords(x, y);
    this.value = character;

    const sets = {
      numbers: "0123456789",
      period: "."
    }

    if (sets.numbers.includes(character)) {
      this.type = "Number";
    } else if (sets.period.includes(character)) {
      this.type = "Period"
    } else {
      this.type = "Symbol";
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
