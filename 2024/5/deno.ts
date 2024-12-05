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
        if (!rule) return true;
        return !rule.has(before);
      })
    )
  );
}

export function partOne(input: string): number {
  const [rules, updates] = parseInput(input);

  const [correct] = partitionUpdates(rules, updates);

  return correct.reduce(
    (total, update) => total + update[(update.length - 1) / 2],
    0,
  );
}

if (import.meta.main) {
  const input = await Deno.readTextFile("./2024/5/input.txt");
  console.log("Part One: " + partOne(input));
}

export function partTwo(input: string): number {
  const [rules, updates] = parseInput(input);

  const [, incorrect] = partitionUpdates(rules, updates);
}
