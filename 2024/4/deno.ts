const add = (a: number, b: number) => a + b;

export function countXmas(text: string): number {
  const rows = text.split("\n").slice(0, -1);
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

function diagonalInner(rows: string[]): string[] {
  const upper = Array.from(rows[0].slice(0, -3))
    .map((char, i) =>
      rows.slice(1).reduce(
        (prev, curr, j) =>
          i + j + 1 < curr.length ? prev + curr[i + j + 1] : prev,
        char,
      )
    );
  const lower = rows.slice(1, -3)
    .map((_, i) =>
      rows.slice(i + 1).reduce(
        (prev, curr, j) => prev + curr[j],
        "",
      )
    );
  return upper.concat(lower);
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
