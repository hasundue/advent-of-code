import { assertEquals } from "jsr:@std/assert";
import { partOne } from "./main.ts";

const example = "125 17";

Deno.test("11-1", () => {
  assertEquals(partOne(example), 55312);
});
