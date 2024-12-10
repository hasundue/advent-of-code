import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./main.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);

Deno.test("Day9 - Part One", () => {
  assertEquals(partOne(example), 1928);
});

Deno.test("Day9 - Part Two", () => {
  assertEquals(partTwo(example), 2858);
});
