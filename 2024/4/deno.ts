const add = (a: number, b: number) => a + b;

export function countXmas(input: string): number {
  const rows = input.split("\n").slice(0, -1);
  const verticals = vertical(rows);
  const diagnoals = diagonal(rows);
  return rows.concat(verticals).concat(diagnoals)
    .map(countXmasInner).reduce(add);
}

function countXmasInner(line: string): number {
  let count = 0;
  const forward = line.match(/XMAS/g);
  count += forward?.length ?? 0;
  const backward = line.match(/SAMX/g);
  count += backward?.length ?? 0;
  return count;
}

function upperDiagonal(rows: string[]): string[] {
  return Array.from(rows[0].slice(0, -2))
    .map((char, i) =>
      rows.slice(1).reduce(
        (prev, curr, j) =>
          i + j + 1 < curr.length ? prev + curr[i + j + 1] : prev,
        char,
      )
    );
}

function lowerDiagonal(rows: string[]): string[] {
  return rows.slice(1, -2)
    .map((_, i) =>
      rows.slice(i + 1).reduce(
        (prev, curr, j) => prev + curr[j],
        "",
      )
    );
}

function diagonalInner(rows: string[]): string[] {
  return upperDiagonal(rows).concat(lowerDiagonal(rows));
}

function mirror(rows: string[]): string[] {
  return rows.map((row) => Array.from(row).toReversed().join(""));
}

function diagonal(rows: string[]): string[] {
  return diagonalInner(rows).concat(diagonalInner(mirror(rows)));
}

function vertical(rows: string[]): string[] {
  return Array.from(rows[0])
    .map((char, i) =>
      rows.slice(1).reduce((prev, curr) => prev + curr[i], char)
    );
}

export function countTrueXmas(input: string): number {
  const chars = input.split("\n").slice(0, -1).map((row) => row.split(""));
  let count = 0;
  for (let i = 1; i < chars.length - 1; i++) {
    const row = chars[i];
    for (let j = 1; j < row.length - 1; j++) {
      if (row[j] !== "A") {
        continue;
      }
      const forward = chars[i - 1][j - 1] + chars[i][j] + chars[i + 1][j + 1];
      if (!forward.match(/(SAM)|(MAS)/)) {
        continue;
      }
      const backward = chars[i - 1][j + 1] + chars[i][j] + chars[i + 1][j - 1];
      if (!backward.match(/(SAM)|(MAS)/)) {
        continue;
      }
      count++;
    }
  }
  return count;
}

if (import.meta.main) {
  const input = await Deno.readTextFile("2024/4/input.txt");
  console.log("Part One Answer: " + countXmas(input));
  console.log("Part Two Answer: " + countTrueXmas(input));
}
