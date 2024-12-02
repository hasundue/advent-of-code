import { distinct, zip } from "jsr:@std/collections";

const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

const lines = text.split("\n").slice(0, -1);

const reports = lines.map((line) =>
  line.split(" ").map((str) => parseInt(str))
);

function isSafe(report: number[]) {
  const diffs = zip(report.slice(0, -1), report.slice(1))
    .map((tuple) => tuple[1] - tuple[0]);
  if (diffs.some((it) => Math.abs(it) < 1 || Math.abs(it) > 3)) {
    return false;
  }
  const signs = distinct(diffs.map((it) => Math.sign(it)));
  if (signs.length > 1) {
    return false;
  }
  return true;
}

const result = reports.filter(isSafe).length;

console.log(result);
