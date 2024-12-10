import { assertEquals } from "jsr:@std/assert";
import { decode, compact, checksum } from "./main.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);

Deno.test("Day9 - Part One", () => {
  const disk = decode(example);
  assertEquals(
    disk,
    "00...111...2...333.44.5555.6666.777.888899",
  );
  const compacted = compact(disk);
  assertEquals(
    compacted,
    "0099811188827773336446555566..............",
  );
  assertEquals(
    checksum(compacted),
    1928,
  );
});
