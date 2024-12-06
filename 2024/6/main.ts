import { assertExists } from "jsr:@std/assert";

type Pos = [number, number];

export function partOne(input: string): number {
  const lines = input.split("\n").slice(0, -1)

  const start = lines.reduce<Pos | undefined>((pos, row, i) => {
    if (pos) return pos;
    const j = row.match(/\^/)?.index;
    return j ? [i, j] : undefined;
  }, undefined);

  assertExists(start);

  const map = lines.map((line) => line.split(""));
  const size = [map.length, map[0].length];

  const visited = new Map<number, Set<number>>();
  let curr = start;
  let move = [-1, 0];

  while (true) {
    const set = visited.get(curr[0]) ?? new Set();
    visited.set(curr[0], set.add(curr[1]));

    const next = [curr[0] + move[0], curr[1] + move[1]] as Pos;
    if (next[0] < 0 || next[0] >= size[0] || next[1] < 0 || next[1] >= size[1]) {
      break;
    }
    if (map[next[0]][next[1]] === "#") {
      move = [move[1], -move[0]];
    } else {
      curr = next;
    }
  }
  return visited.values().reduce((total, set) => total + set.size, 0)
}

if (import.meta.main) {
  const input = await Deno.readTextFile("./2024/6/input.txt");
  console.log(partOne(input));
}

export function partTwo(input: string): number {
  return 0;
}
