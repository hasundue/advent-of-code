import { unzip, zip } from "jsr:@std/collections";

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

const lines = input.split("\n").slice(0, -1);

const tuples = lines.map((line) =>
  line.split(/\s+/).map((str) => parseInt(str))
) as [number, number][];

const [left, right] = unzip(tuples).map((arr) => arr.toSorted());

const add = (a: number, b: number) => a + b;

const distance = zip(left, right).map((tuple) => Math.abs(tuple[0] - tuple[1]))
  .reduce(add);

console.log(distance);

const similarity = left.map((n) => n * right.filter((m) => n == m).length)
  .reduce(add);

console.log(similarity);
