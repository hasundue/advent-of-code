type Disk = (number | null)[];

function decode(input: string): Disk {
  const map = input.slice(0, -1).split("").map(Number);
  const disk: Disk = [];
  map.forEach((num, i) => {
    for (let k = 0; k < num; k++) {
      disk.push(i % 2 === 0 ? i / 2 : null);
    }
  });
  return disk;
}

function compact(disk: Disk): Disk {
  disk.forEach((value, i) => {
    if (value !== null) {
      return;
    }
    const j = disk.findLastIndex((it) => it !== null);
    if (j <= i) {
      return;
    }
    const moving = disk[j];
    disk[i] = moving;
    disk[j] = null;
  });
  return disk;
}

export function checksum(input: string) {
  const disk = decode(input);
  const compacted = compact(disk);
  const data = compacted.slice(
    0,
    compacted.findIndex((it) => it === null),
  ) as number[];
  return data.reduce((total, curr, i) => total + curr * i);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("2024/9/input.txt");
  console.log(checksum(input));
}
