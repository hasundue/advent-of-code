class SparseMatrix<T> {
  constructor(private maps: Map<number, Map<number, T>> = new Map()) {}

  get(row: number, col: number): T | undefined {
    return this.maps.get(row)?.get(col);
  }
  set(row: number, col: number, value: T): SparseMatrix<T> {
    if (!this.maps.has(row)) {
      this.maps.set(row, new Map());
    }
    this.maps.get(row)!.set(col, value);
    return this;
  }
}

function parseInput(input: string): SparseMatrix<string> {
  const antennas = new SparseMatrix<string>();
  input.split("\n").slice(0, -1).forEach((line, row) => {
    line.split("").forEach((char, col) => {
      if (char !== ".") {
        antennas.set(row, col, char);
      }
    });
  });
  return antennas;
}

export function partOne(input: string): number {
  const antennas = parseInput(input);
  console.log(antennas);
  return 0;
}

if (import.meta.main) {
  const input = await Deno.readTextFile(
    new URL("./input.txt", import.meta.url),
  );
  console.log(partOne(input));
}
