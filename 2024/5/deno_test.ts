import { assertEquals } from "jsr:@std/assert";
import { partOne, partTwo } from "./deno.ts";

Deno.test("partOne", () => {
  const input = Deno.readTextFileSync("./2024/5/input.example.txt");
  assertEquals(partOne(input), 143);
});

Deno.test("partTwo", () => {
  const input = Deno.readTextFileSync("./2024/5/input.example.txt");
  assertEquals(partTwo(input), 123);
});
