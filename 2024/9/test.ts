import { assertEquals } from "jsr:@std/assert";
import { checksum } from "./main.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);

Deno.test("Day9 - Part One", () => {
  assertEquals(checksum(example), 1928);
});
