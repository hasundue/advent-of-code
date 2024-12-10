export function decode(input: string): string {
  return input.slice(0, -1).split("").map(Number).reduce((acc, curr, i) =>
    acc +
    (i % 2 === 0 ? (i / 2).toString().repeat(curr) : ".".repeat(curr)), "");
}

export function compact(disk: string): string {
  const arr = disk.split("").map((char) =>
    char === "." ? char : parseInt(char)
  );
  arr.forEach((value, i) => {
    if (value !== ".") {
      return;
    }
    const j = arr.findLastIndex((it) => it !== ".");
    if (j <= i) {
      return;
    }
    const moving = arr[j];
    arr[i] = moving;
    arr[j] = ".";
  });
  return arr.reduce(
    (acc, curr) => acc + (curr === "." ? curr : curr.toString()),
    "",
  );
}

export function checksum(compacted: string) {
  const [data] = compacted.match(/\d+/)!;
  return data.split("").map(Number)
    .reduce((total, curr, i) => total + curr * i);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("2024/9/input.txt");
  const decoded = decode(input);
  const compacted = compact(decoded);
  console.log(compacted);
  console.log(checksum(compacted));
}
