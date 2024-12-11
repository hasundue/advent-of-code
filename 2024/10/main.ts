type TopographicMap = number[][];

function parseInput(input: string): TopographicMap {
  return input.split("\n").slice(0, -1)
    .map((line) => line.split("").map(Number));
}

type Point = [number, number];

function findZeros(map: TopographicMap): Point[] {
  const found: Point[] = [];
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) {
        found.push([x, y]);
      }
    });
  });
  return found;
}

export function partOne(input: string): number {
  const map = parseInput(input);
  console.log(map);
  const starts = findZeros(map);
  console.log(starts);
  const trailheads = starts.flatMap(findTrailheads);
  return 0;
}

type Trailhead = {
  pos: Point;
  score: number;
};
