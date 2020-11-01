import test from "ava";
import { sequence, aft } from "./helper/util.mjs";
import aggregate, { aggregateFifo } from "aggregate-async-iterator";

test("default is aggregateFifo", t => {
  t.is(aggregateFifo, aggregate);
});


test(
  "simple",
  aft,
  aggregateFifo,
  [sequence("A", 100, 5), sequence("B", 34, 7)],
  ["B0", "B1", "A0", "B2", "B3", "B4", "A1", "B5", "B6", "A2", "A3", "A4"]
);

test(
  "rejects",
  aft,
  aggregateFifo,
  [sequence("A", 100, 5, 2), sequence("B", 34, 7)],
  ["B0", "B1", "A0", "B2", "B3", "B4", "A1", "B5", "B6"],
  "A2"
);

test("only rejects", aft, aggregateFifo, [sequence("A", 100, 5, 0)], [], "A0");
test(
  "several only rejects",
  aft,
  aggregateFifo,
  [sequence("A", 100, 5, 0), sequence("B", 30, 5, 0)],
  [],
  "B0"
);

test(
  "empty",
  aft,
  aggregateFifo,
  [sequence("A", 100, 0), sequence("B", 100, 0)],
  []
);

test("no input", aft, aggregateFifo, [], []);

test(
  "single source",
  aft,
  aggregateFifo,
  [sequence("A", 100, 5)],
  ["A0", "A1", "A2", "A3", "A4"]
);
