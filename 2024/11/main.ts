export function partOne(input: string): number {
  const stones = parseInput(input);
  blinkMany(stones, 25);
  return stones.length;
}

function blinkMany(stones: number[], count: number): void {
  for (let i = 0; i < count; i++) {
    blink(stones);
    console.log(i + 1 + ":", stones.length);
  }
}

function blink(stones: number[]): void {
  let count = stones.length;
  for (let i = 0; i < count; i++) {
    const num = stones[i];
    if (num === 0) {
      stones[i] = 1;
      continue;
    }
    const d = digits(num);
    if (d % 2 === 0) {
      const [left, right] = split(num, d / 2);
      stones[i] = left;
      stones.splice(i + 1, 0, right);
      i++;
      count++;
    } else {
      stones[i] = stones[i] * 2024;
    }
  }
}

function digits(num: number): number {
  const log = Math.log10(num);
  return Math.trunc(log) + 1;
}

function split(num: number, len: number): [number, number] {
  const left = Math.floor(num / 10 ** len);
  const right = num % 10 ** len;
  return [left, right];
}

function parseInput(input: string): number[] {
  return input.split(" ").map((it) => parseInt(it));
}

export function partTwo(input: string): number {
  const stones = parseInput(input);
  blinkMany(stones, 75);
  return stones.length;
}

if (import.meta.main) {
  const input = "5178527 8525 22 376299 3 69312 0 275";
  console.log(partOne(input));
  console.log(partTwo(input));
}
