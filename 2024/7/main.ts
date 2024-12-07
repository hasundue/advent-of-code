export function partOne(input: string): number {
  return parseEquations(input)
    .filter((equation) => evaluate(equation, ["+", "*"]))
    .reduce((total, equation) => total + equation.test, 0);
}

type Equation = {
  test: number;
  numbers: number[];
};

function parseEquations(input: string): Equation[] {
  return input.split("\n").slice(0, -1).map(parseLine);
}

function parseLine(line: string): Equation {
  const [left, right] = line.split(": ");
  return {
    test: Number(left),
    numbers: right.split(" ").map(Number),
  };
}

type Operator = (a: number, b: number) => number;

const op: Record<Op, Operator> = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
  "||": (a, b) => Number(a.toString() + b.toString()),
};

type Op = "+" | "*" | "||";

function evaluate(
  equation: Equation,
  operators: Op[],
): boolean {
  const { test, numbers } = equation;
  return evaluateOp(test, numbers, operators, op["+"], 0);
}

function evaluateOp(
  test: number,
  numbers: number[],
  operators: Op[],
  operator: Operator,
  prev: number,
): boolean {
  const curr = operator(prev, numbers[0]);
  if (numbers.length === 1) {
    return curr === test;
  }
  return operators.some((o) =>
    evaluateOp(test, numbers.slice(1), operators, op[o], curr)
  );
}

export function partTwo(input: string): number {
  return parseEquations(input)
    .filter((equation) => evaluate(equation, ["+", "*", "||"]))
    .reduce((total, equation) => total + equation.test, 0);
}

if (import.meta.main) {
  const input = await Deno.readTextFile(
    new URL("./input.txt", import.meta.url),
  );
  console.log(partOne(input));
  console.log(partTwo(input));
}
