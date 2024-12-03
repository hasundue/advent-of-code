const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

//const text =
//  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

//const text =
//  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

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

console.log(sumUp(text));

function sumUpEnabled(text: string): number {
  const chunks = ("do()" + text).split("don't()");
  const enabled = chunks.map((chunk) => {
    const [_, ..._chunks] = chunk.split("do()");
    return _chunks ? _chunks.join() : "";
  });
  return enabled.map(sumUp).reduce((acc, curr) => acc + curr);
}

console.log(sumUpEnabled(text));
