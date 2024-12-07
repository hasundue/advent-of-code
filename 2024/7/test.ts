import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./main.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);

Deno.test("partOne", () => {
  assertEquals(partOne(example), 3749);
});

Deno.test("partOne", () => {
  assertEquals(partTwo(example), 11387);
});
