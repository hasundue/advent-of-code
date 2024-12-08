import { distinctBy } from "jsr:@std/collections";

type Antenna = {
  row: number;
  col: number;
  freq: string;
};

function groupByFreq(antennas: Antenna[]): Antenna[][] {
  const obj = Object.groupBy(
    antennas,
    (it) => it.freq,
  ) as Record<string, Antenna[]>;
  return Object.values(obj);
}

function combinations<T>(arr: T[]): [T, T][] {
  return arr.flatMap((_, i) =>
    arr.slice(i + 1).map((x) => [arr[i], x] as [T, T])
  );
}

type Offset = {
  row: number;
  col: number;
};

function getOffset(a: Antenna, b: Antenna): Offset {
  return {
    row: b.row - a.row,
    col: b.col - a.col,
  };
}

function normal(offset: Offset): Offset {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const div = gcd(offset.row, offset.col);
  return {
    row: offset.row / div,
    col: offset.col / div,
  };
}

function opposite(offset: Offset): Offset {
  return {
    row: -offset.row,
    col: -offset.col,
  };
}

type Antinode = {
  row: number;
  col: number;
};

class AntennaMap {
  private maps: Map<number, Map<number, string>> = new Map();
  readonly size: [number, number];

  constructor(input: string) {
    const lines = input.split("\n").slice(0, -1);
    lines.forEach((line, row) => {
      line.split("").forEach((char, col) => {
        if (char !== ".") {
          this.set(row, col, char);
        }
      });
    });
    this.size = [lines.length, lines[0].length];
  }

  get(row: number, col: number): string | undefined {
    return this.maps.get(row)?.get(col);
  }

  set(row: number, col: number, freq: string): AntennaMap {
    if (!this.maps.has(row)) {
      this.maps.set(row, new Map());
    }
    this.maps.get(row)!.set(col, freq);
    return this;
  }

  list(): Antenna[] {
    const antennas: Antenna[] = [];
    this.maps.forEach((cols, row) => {
      cols.forEach((freq, col) => {
        antennas.push({ row, col, freq });
      });
    });
    return antennas;
  }

  covers(row: number, col: number): boolean {
    return row >= 0 && row < this.size[0] && col >= 0 && col < this.size[1];
  }

  antinodes(): Antinode[] {
    const entries = this.list();
    const antinodes = groupByFreq(entries).flatMap(
      (group) => this.antinodesForFreq(group),
    );
    return distinctBy(antinodes, (it) => `${it.row},${it.col}`);
  }

  private antinodesForFreq(antennas: Antenna[]): Antinode[] {
    const pairs = combinations(antennas);
    return pairs.flatMap((pair) => this.antinodesForPair(pair));
  }

  private antinodesForPair([a, b]: [Antenna, Antenna]): Antinode[] {
    const offset = getOffset(a, b);

    const candidates: Antinode[] = [
      { row: a.row - offset.row, col: a.col - offset.col },
      { row: b.row + offset.row, col: b.col + offset.col },
    ];
    return candidates.filter((it) => this.covers(it.row, it.col));
  }

  manyAntinodes(): Antinode[] {
    const entries = this.list();
    const antinodes = groupByFreq(entries).flatMap(
      (group) => this.manyAntinodesForFreq(group),
    );
    return distinctBy(antinodes, (it) => `${it.row},${it.col}`);
  }

  manyAntinodesForFreq(antennas: Antenna[]): Antinode[] {
    const pairs = combinations(antennas);
    return pairs.flatMap((pair) => this.manyAntinodesForPair(pair));
  }

  manyAntinodesForPair([a, b]: [Antenna, Antenna]): Antinode[] {
    const offset = getOffset(a, b);
    const norm = normal(offset);
    return [
      ...this.manyAntinodesForPairWithOffset(a, opposite(norm)),
      ...this.manyAntinodesForPairWithOffset(b, norm),
    ];
  }

  manyAntinodesForPairWithOffset(a: Antenna, offset: Offset): Antinode[] {
    const candidates: Antinode[] = [];
    let current = { row: a.row, col: a.col };
    while (this.covers(current.row, current.col)) {
      candidates.push(current);
      current = {
        row: current.row + offset.row,
        col: current.col + offset.col,
      };
    }
    return candidates;
  }
}

export function countAntinodes(input: string): number {
  const antennas = new AntennaMap(input);
  const antinodes = antennas.antinodes();
  return antinodes.length;
}

export function countManyAntinodes(input: string): number {
  const antennas = new AntennaMap(input);
  const antinodes = antennas.manyAntinodes();
  return antinodes.length;
}

if (import.meta.main) {
  const input = await Deno.readTextFile(
    new URL("./input.txt", import.meta.url),
  );
  console.log(countAntinodes(input));
  console.log(countManyAntinodes(input));
}
