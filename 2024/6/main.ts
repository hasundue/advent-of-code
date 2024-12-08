type Position = [number, number];

const Position = {
  move: (pos: Position, direction: Direction): Position => [
    pos[0] + direction[0],
    pos[1] + direction[1],
  ],
  toString: (pos: Position): string => `${pos[0]},${pos[1]}`,
};

type Direction = [number, number];

const Direction = {
  match: (a: Direction, b: Direction): boolean =>
    a[0] === b[0] && a[1] === b[1],
  turn: (direction: Direction): Direction => [direction[1], -direction[0]],
  toString: (direction: Direction): string => `${direction[0]},${direction[1]}`,
};

class FloorMap {
  readonly size: [number, number];

  constructor(public rows: string[][]) {
    this.size = [rows.length, rows[0].length];
  }

  static fromInput(input: string): FloorMap {
    return new FloorMap(
      input.split("\n").slice(0, -1).map((line) => line.split("")),
    );
  }

  replace(
    row: number,
    col: number,
    replacement: string,
  ): FloorMap {
    return new FloorMap(
      this.rows.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? replacement : c)) : r
      ),
    );
  }

  get start(): Position {
    return this.rows.reduce<Position | undefined>((pos, row, i) => {
      if (pos) return pos;
      const j = row.indexOf("^");
      return j !== -1 ? [i, j] : undefined;
    }, undefined) as Position;
  }

  covers(pos: Position): boolean {
    return pos[0] >= 0 && pos[0] < this.size[0] && pos[1] >= 0 &&
      pos[1] < this.size[1];
  }

  examine(pos: Position): string | undefined {
    return this.covers(pos) ? this.rows[pos[0]][pos[1]] : undefined;
  }
}

class InfiniteLoopError extends Error {
  constructor(public position: Position) {
    super();
  }
}

function patrol(map: FloorMap, options?: {
  start?: Position;
  direction?: Direction;
  visited?: Map<string, string>;
  check?: (
    curr: Position,
    direction: Direction,
    visited: Map<string, string>,
  ) => void;
}) {
  const visited = options?.visited ?? new Map();

  let curr = options?.start ?? map.start;
  let dir = options?.direction ?? [-1, 0];

  while (true) {
    const last = visited.get(Position.toString(curr));

    if (last && last === Direction.toString(dir)) {
      throw new InfiniteLoopError(curr);
    }

    options?.check?.(curr, dir, new Map(visited));

    const front = map.examine(Position.move(curr, dir));

    if (front === "#") {
      dir = Direction.turn(dir);
    }
    visited.set(Position.toString(curr), Direction.toString(dir));

    if (!front) {
      break;
    }
    curr = Position.move(curr, dir);
  }
  return visited;
}

export function partOne(input: string): number {
  const map = FloorMap.fromInput(input);
  const visited = patrol(map);
  return visited.size;
}

export function partTwo(input: string): number {
  const map = FloorMap.fromInput(input);
  const found = new Set<string>();
  patrol(map, {
    check: (curr, direction, visited) => {
      const front = Position.move(curr, direction);
      try {
        patrol(map.replace(front[0], front[1], "#"), {
          start: curr,
          direction,
          visited,
        });
      } catch (e) {
        if (e instanceof InfiniteLoopError) {
          found.add(`${front[0]},${front[1]}`);
        }
      }
    },
  });
  return found.size;
}

if (import.meta.main) {
  const input = await Deno.readTextFile("./2024/6/input.txt");
  console.log(partOne(input));
  console.log(partTwo(input));
}
