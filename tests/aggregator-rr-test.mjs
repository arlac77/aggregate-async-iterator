import test from "ava";
import { sequence } from "./helper/util.mjs";
import { aggregateRoundRobin } from "aggregate-async-iterator";

test("rr simple", async t => {
  const results = [];

  for await (const r of aggregateRoundRobin([
    sequence("A", 100, 5),
    sequence("B", 50, 7)
  ])) {
    results.push(r);
  }

  t.deepEqual(results, [
    "A0",
    "B0",
    "A1",
    "B1",
    "A2",
    "B2",
    "A3",
    "B3",
    "A4",
    "B4",
    "B5",
    "B6"
  ]);
});

test("rr empty", async t => {
  const results = [];

  for await (const r of aggregateRoundRobin([
    sequence("A", 100, 0),
    sequence("B", 100, 0)
  ])) {
    results.push(r);
  }

  t.deepEqual(results, []);
});

test("rr single source", async t => {
  const results = [];

  for await (const r of aggregateRoundRobin([
    sequence("A", 100, 5),
  ])) {
    results.push(r);
  }

  t.deepEqual(results, [
    "A0",
    "A1",
    "A2",
    "A3",
    "A4"
  ]);
});
