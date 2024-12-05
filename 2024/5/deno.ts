import { partition } from "jsr:@std/collections";

type RuleMap = Map<number, Set<number>>;
type UpdateList = number[][];

function parseInput(input: string): [RuleMap, UpdateList] {
  const lines = input.split("\n").slice(0, -1);

  const sep = lines.findIndex((line) => line === "");

  const rules = lines
    .slice(0, sep)
    .map((rule) =>
      rule.split("|").map((page) => parseInt(page)) as [number, number]
    )
    .reduce((map, rule) => {
      const set = map.get(rule[0]) ?? new Set<number>();
      set.add(rule[1]);
      return map.set(rule[0], set);
    }, new Map<number, Set<number>>());

  const updates = lines.slice(sep + 1).map((update) =>
    update.split(",").map((n) => parseInt(n))
  );

  return [rules, updates];
}

function partitionUpdates(rules: RuleMap, updates: number[][]): [number[][], number[][]] {
  return partition(updates, (update) =>
    update.every((page, i) =>
      update.slice(0, i).every((before) => {
        const rule = rules.get(page);
        return !rule || !rule.has(before);
      })
    )
  );
}

function addUpMiddle(updates: UpdateList): number {
  return updates.reduce(
    (total, update) => total + update[(update.length - 1) / 2],
    0,
  );
}

export function partOne(input: string): number {
  const [rules, updates] = parseInput(input);

  const [correct] = partitionUpdates(rules, updates);

  return addUpMiddle(correct);
}

export function partTwo(input: string): number {
  const [rules, updates] = parseInput(input);

  const [, incorrect] = partitionUpdates(rules, updates);

  const corrected = incorrect.map((update) =>
    update.toSorted((a, b) => {
      const rule = rules.get(b);
      if (!rule) return 0;
      if (rule.has(a)) return -1; else return 1;
    }).toReversed());

  return addUpMiddle(corrected);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("./2024/5/input.txt");
  console.log("Part One: " + partOne(input));
  console.log("Part Two: " + partTwo(input));
}
