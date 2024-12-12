import { distinctBy } from "jsr:@std/collections";

type TopographicMap = number[][];

function parseInput(input: string): TopographicMap {
  return input.split("\n").slice(0, -1)
    .map((line) => line.split("").map(Number));
}

type Point = [number, number];

function findZeros(map: TopographicMap): Point[] {
  const found: Point[] = [];
  map.forEach((row, y) => {
    row.forEach((height, x) => {
      if (height === 0) {
        found.push([x, y]);
      }
    });
  });
  return found;
}

export function partOne(input: string): number {
  const map = parseInput(input);
  const starts = findZeros(map);
  const trailheads = starts.map((start) => {
    const score = distinctBy(
      routes(map, start),
      (it) => it.at(-1)?.join(","),
    ).length;
    if (score > 0) {
      return { start, score };
    }
  }).filter((it) => it !== undefined);
  return trailheads.reduce((total, it) => total + it.score, 0);
}

type Route = Point[];

function routes(
  map: TopographicMap,
  pos: Point,
  route: Point[] = [],
): Route[] {
  const curr = height(map, pos);
  const prev = route.at(-1);
  if (prev !== undefined && curr !== height(map, prev) + 1) {
    return [];
  }
  const updated = [...route, pos];
  if (curr === 9) {
    return [updated];
  }
  return neighbors(map, pos)
    .filter((it) => !prev || !identical(it, prev))
    .reduce(
      (found, neighbor) => found.concat(routes(map, neighbor, updated)),
      [] as Route[],
    ).filter((it) => it.length > 0);
}

function height(map: TopographicMap, pos: Point): number {
  const [x, y] = pos;
  return map[y][x];
}

function neighbors(map: TopographicMap, pos: Point): Point[] {
  const [x, y] = pos;
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].filter((it) => covers(map, it as Point)) as Point[];
}

function covers(map: TopographicMap, pos: Point): boolean {
  const [x, y] = pos;
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function identical(a: Point, b: Point): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

export function partTwo(input: string): number {
  const map = parseInput(input);
  const starts = findZeros(map);
  const trailheads = starts.map((start) => {
    const rating = routes(map, start).length;
    if (rating > 0) {
      return { start, rating };
    }
  }).filter((it) => it !== undefined);
  return trailheads.reduce((total, it) => total + it.rating, 0);
}

if (import.meta.main) {
  const input = await Deno.readTextFile(new URL("input.txt", import.meta.url));
  console.log(partOne(input));
  console.log(partTwo(input));
}
