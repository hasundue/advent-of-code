type Pos = [number, number];
type Direction = [number, number];
type Map = string[][];

const parseMap = (input: string): Map =>
  input.split("\n").slice(0, -1).map((line) => line.split(""));

const getSize = (map: Map): [number, number] => [map.length, map[0].length];

const getStartPos = (map: Map): Pos =>
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

const examine = (map: Map, pos: Pos): string => map[pos[0]][pos[1]];

const turn = (direction: Direction): Direction => [direction[1], -direction[0]];

export function partOne(input: string): number {
  const map = parseMap(input);

  const start = getStartPos(map);
  const size = getSize(map);

  const visited = new Map<number, Set<number>>();
  let curr = start;
  let direction: Direction = [-1, 0];

  while (true) {
    const set = visited.get(curr[0]) ?? new Set();
    visited.set(curr[0], set.add(curr[1]));

    const next = move(curr, direction);
    if (isOutside(next, size)) {
      break;
    }
    if (examine(map, next) === "#") {
      direction = turn(direction);
      curr = move(curr, direction);
    } else {
      curr = next;
    }
  }
  return visited.values().reduce((total, set) => total + set.size, 0);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("./2024/6/input.txt");
  console.log(partOne(input));
}

export function partTwo(input: string): number {
  return 0;
}
