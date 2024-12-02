import { unzip, zip } from "jsr:@std/collections";

const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

const lines = text.split("\n").slice(0, -1);

const tuples = lines.map((line) =>
  line.split(/\s+/).map((str) => parseInt(str))
) as [number, number][];

const lists = unzip(tuples).map((arr) => arr.toSorted());

const distances = zip(...lists).map((tuple) => Math.abs(tuple[0] - tuple[1]));

const result = distances.reduce((prev, curr) => prev + curr, 0);

console.log(result);
