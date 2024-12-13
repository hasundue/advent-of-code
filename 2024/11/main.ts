export function partOne(input: string): number {
  const stones = parseInput(input);
  return blinkAndCount(stones, 25);
}

function blinkAndCount(stones: number[], count: number): number {
  return stones.reduce((acc, it, i) => {
    const curr = acc + changeAndCount(it, count);
    console.log(i, curr);
    return curr;
  }, 0);
}

function changeAndCount(stone: number, counter: number): number {
  if (counter === 0) {
    return 1;
  }
  const changed = change(stone);
  if (typeof changed === "number") {
    return changeAndCount(changed, counter - 1);
  }
  return changed.reduce((acc, it) => acc + changeAndCount(it, counter - 1), 0);
}

function change(
  stone: number,
): number | [number, number] {
  if (stone === 0) {
    return 1;
  }
  const d = digits(stone);
  if (d % 2 === 0) {
    return split(stone, d / 2);
  }
  return stone * 2024;
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
  return blinkAndCount(stones, 75);
}

if (import.meta.main) {
  const input = "5178527 8525 22 376299 3 69312 0 275";
  console.log(partOne(input));
  console.log(partTwo(input));
}
