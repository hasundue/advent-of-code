type Disk = (File | Space)[];

type File = {
  id: number;
  size: number;
};

type Space = {
  id: undefined;
  size: number;
};

function isFile(it: File | Space): it is File {
  return it.id !== undefined;
}

function decode(input: string): Disk {
  const map = input.slice(0, -1).split("").map(Number);
  return map.map((num, i) =>
    i % 2 === 0 ? { id: i / 2, size: num } : { size: num }
  );
}

type Blocks = (number | null)[];

function serialize(disk: Disk): Blocks {
  const blocks: Blocks = [];
  disk.forEach((it) => {
    const block = isFile(it) ? it.id : null;
    for (let k = 0; k < it.size; k++) {
      blocks.push(block);
    }
  });
  return blocks;
}

function compactBlocks(disk: Blocks): Blocks {
  disk.forEach((value, i) => {
    if (value !== null) {
      return;
    }
    const j = disk.findLastIndex((it) => it !== null);
    if (j <= i) {
      return;
    }
    disk[i] = disk[j];
    disk[j] = null;
  });
  return disk;
}

function checksum(compacted: Blocks) {
  return compacted
    .map((it) => it ? it : 0)
    .reduce((total, curr, i) => total + curr * i);
}

export function partOne(input: string) {
  const disk = decode(input);
  const blocks = serialize(disk);
  const compacted = compactBlocks(blocks);
  return checksum(compacted);
}

function compact(disk: Disk): Disk {
  let len = disk.length;
  for (let i = 0; i < len; i++) {
    const curr = disk[i];
    if (isFile(curr)) {
      continue;
    }
    let j = disk.findLastIndex((it) => isFile(it) && it.size <= curr.size);
    if (j <= i) {
      continue;
    }
    disk[i] = { ...disk[j] };
    const rem = curr.size - disk[j].size;
    if (rem > 0) {
      disk.splice(i + 1, 0, { id: undefined, size: rem });
      j++;
      len++;
    }
    disk[j] = { id: undefined, size: disk[j].size };
  }
  return disk;
}

export function partTwo(input: string) {
  const disk = decode(input);
  const compacted = compact(disk);
  const blocks = serialize(compacted);
  return checksum(blocks);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("2024/9/input.txt");
  console.log(partOne(input));
  console.log(partTwo(input));
}
