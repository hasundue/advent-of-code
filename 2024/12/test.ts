import { assertEquals } from "jsr:@std/assert";
import { partOne } from "./main.ts";

const example = await Deno.readTextFile("2024/12/example.txt");

Deno.test("12-1", () => {
  assertEquals(partOne(example), 1930);
});
