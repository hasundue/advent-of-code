import { assertEquals } from "jsr:@std/assert";
import { partOne } from "./main.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);

Deno.test("10-1", () => {
  assertEquals(partOne(example), 36);
});
