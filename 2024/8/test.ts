import { assertEquals } from "jsr:@std/assert";
import { countAntinodes, countManyAntinodes } from "./main.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);

Deno.test("partOne", () => {
  assertEquals(countAntinodes(example), 14);
});

Deno.test("partTwo", () => {
  assertEquals(countManyAntinodes(example), 34);
});
