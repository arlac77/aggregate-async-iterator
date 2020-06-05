import test from "ava";
import { sequence } from "./helper/util.mjs";
import aggregate, { aggregateFifo } from "aggregate-async-iterator";

test("default is aggregateFifo", t => {
  t.is(aggregateFifo, aggregate);
});

test("fifo simple", async t => {
  const results = [];

  for await (const r of aggregateFifo([
    sequence("A", 100, 5),
    sequence("B", 34, 7)
  ])) {
    results.push(r);
  }

  t.deepEqual(results, [
    "B0",
    "B1",
    "A0",
    "B2",
    "B3",
    "B4",
    "A1",
    "B5",
    "B6",
    "A2",
    "A3",
    "A4"
  ]);
});

test("fifo with rejects", async t => {
  const results = [];

  try {
    for await (const r of aggregateFifo([
      sequence("A", 100, 5, 2),
      sequence("B", 34, 7)
    ])) {
      results.push(r);
    }

    t.fail('none reachable');
  }
  catch(e) {
  t.deepEqual(results, [
    "B0",
    "B1",
    "A0",
    "B2",
    "B3",
    "B4",
    "A1",
    "B5",
    "B6"
  ]);
  }
});

test("fifo empty", async t => {
  const results = [];

  for await (const r of aggregateFifo([
    sequence("A", 100, 0),
    sequence("B", 100, 0)
  ])) {
    results.push(r);
  }

  t.deepEqual(results, []);
});

test("fifo single source", async t => {
  const results = [];

  for await (const r of aggregateFifo([sequence("A", 100, 5)])) {
    results.push(r);
  }

  t.deepEqual(results, ["A0", "A1", "A2", "A3", "A4"]);
});
