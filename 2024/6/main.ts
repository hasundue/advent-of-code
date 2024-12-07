type Pos = [number, number];
type Direction = [number, number];
type FloorMap = string[][];

const getMap = (input: string): FloorMap =>
  input.split("\n").slice(0, -1).map((line) => line.split(""));

const getSize = (
  map: FloorMap,
): [number, number] => [map.length, map[0].length];

const getStartPos = (map: FloorMap): Pos =>
  map.reduce<Pos | undefined>((pos, row, i) => {
    if (pos) return pos;
    const j = row.indexOf("^");
    return j !== -1 ? [i, j] : undefined;
  }, undefined) as Pos;

const move = (
  pos: Pos,
  direction: Direction,
): Pos => [pos[0] + direction[0], pos[1] + direction[1]];

const isOutside = (pos: Pos, size: [number, number]): boolean =>
  pos[0] < 0 || pos[0] >= size[0] || pos[1] < 0 || pos[1] >= size[1];

const examine = (map: FloorMap, pos: Pos): string => map[pos[0]][pos[1]];

const turn = (direction: Direction): Direction => [direction[1], -direction[0]];

const isSame = (a: Direction, b: Direction): boolean =>
  a[0] === b[0] && a[1] === b[1];

function patrol(
  map: FloorMap,
  start: Pos,
  direction: Direction,
  fn: (curr: Pos, direction: Direction) => void = () => {},
) {
  const size = getSize(map);

  const visited = new Map<number, Map<number, Direction>>();
  let curr = start;
  let dir: Direction = direction;

  while (true) {
    fn(curr, dir);

    const forward = move(curr, dir);

    const inner = visited.get(curr[0]) ??
      visited.set(curr[0], new Map()).get(curr[0])!;

    const last = inner.get(curr[1]);

    if (last && isSame(last, dir)) {
      throw start; // infinite loop
    }
    inner.set(curr[1], dir);

    if (isOutside(forward, size)) {
      break;
    }
    if (examine(map, forward) === "#") {
      dir = turn(dir);
      curr = move(curr, dir);
    } else {
      curr = forward;
    }
  }
  return visited;
}

export function partOne(input: string): number {
  const map = getMap(input);
  const start = getStartPos(map);
  const visited = patrol(map, start, [-1, 0]);

  return visited.values().reduce((total, set) => total + set.size, 0);
}

export function partTwo(input: string): number {
  const map = getMap(input);
  const start = getStartPos(map);
  const found = new Map<number, Set<number>>();
  patrol(map, start, [-1, 0], (curr: Pos, dir: Direction) => {
    const front = move(curr, dir);
    try {
      patrol(
        map.map((row, i) =>
          i === front[0] ? row.toSpliced(front[1], 1, "#") : row
        ),
        curr,
        dir,
      );
    } catch {
      const front = move(curr, dir);
      const set = found.get(front[0]) ??
        found.set(front[0], new Set()).get(front[0])!;
      set.add(front[1]);
    }
  });
  return found.values().reduce((total, set) => total + set.size, 0);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("./2024/6/input.txt");
  console.log(partOne(input));
  console.log(partTwo(input));
}
