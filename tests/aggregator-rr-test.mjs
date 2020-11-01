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

test("rr with rejects", async t => {
  const results = [];

  try {
    for await (const r of aggregateRoundRobin([
      sequence("A", 100, 5, 2),
      sequence("B", 34, 7)
    ])) {
      results.push(r);
    }

    t.fail('none reachable');
  }
  catch(e) {
  t.deepEqual(results, [
    "A0",
    "B0",
    "A1",
    "B1"
  ]);
  }
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

test("rr no input", async t => {
  const results = [];

  for await (const r of aggregateRoundRobin([])) {
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
