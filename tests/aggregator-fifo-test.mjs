import test from "ava";
import { sequence } from "./helper/util.mjs";
import { aggregateFifo } from "aggregate-async-iterator";

test.only("fifo simple", async t => {
  const results = [];

  for await (const r of aggregateFifo([
    sequence("A", 100, 5),
    sequence("B", 38, 7)
  ])) {
    results.push(r);
  }

  console.log(results);

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

  for await (const r of aggregateFifo([
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
