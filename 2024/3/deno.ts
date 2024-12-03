import { assertEquals } from "jsr:@std/assert";

const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

function sumUp(text: string): number {
  const matches = text.match(/mul\(\d{1,3},\d{1,3}\)/g)!;
  if (matches === null) {
    return 0;
  }
  const pairs = matches.map((match) =>
    match.slice(4, -1).split(",").map((str) => parseInt(str))
  );
  return pairs.map(([a, b]) => a * b).reduce((acc, curr) => acc + curr);
}

Deno.test("sumUp", () => {
  const example =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
  assertEquals(sumUp(example), 161);
});

console.log(sumUp(text));

function sumUpEnabled(text: string): number {
  const chunks = ("do()" + text).split("don't()");
  const enabled = chunks.map((chunk) => {
    const [_, ...after] = chunk.split("do()");
    return after ? after.join() : "";
  });
  return enabled.map(sumUp).reduce((acc, curr) => acc + curr);
}

Deno.test("sumUpEnabled", () => {
  const example =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
  assertEquals(sumUpEnabled(example), 48);
});

console.log(sumUpEnabled(text));
