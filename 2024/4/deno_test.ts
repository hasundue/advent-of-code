import { assertEquals } from "jsr:@std/assert";
import { countTrueXmas, countXmas } from "./deno.ts";

Deno.test("countXmas", () => {
  const example = Deno.readTextFileSync("2024/4/input.example.txt");
  assertEquals(countXmas(example), 18);
});

Deno.test("countTrueXmas", () => {
  const example = Deno.readTextFileSync("2024/4/input.example.txt");
  assertEquals(countTrueXmas(example), 9);
});
