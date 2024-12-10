import { assertEquals } from "jsr:@std/assert";
import { checksum } from "./main.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);

Deno.test("partOne", () => {
  assertEquals(checksum(example), 1928);
});
