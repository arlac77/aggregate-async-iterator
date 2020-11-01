import test from "ava";
import { sequence, aft } from "./helper/util.mjs";
import { aggregateRoundRobin } from "aggregate-async-iterator";

test(
  "simple",
  aft,
  aggregateRoundRobin,
  [sequence("A", 100, 5), sequence("B", 34, 7)],
  ["A0", "B0", "A1", "B1", "A2", "B2", "A3", "B3", "A4", "B4", "B5", "B6"]
);

test(
  "rejects",
  aft,
  aggregateRoundRobin,
  [sequence("A", 100, 5, 2), sequence("B", 34, 7)],
  ["A0", "B0", "A1", "B1"],
  "A2"
);

test(
  "empty",
  aft,
  aggregateRoundRobin,
  [sequence("A", 100, 0), sequence("B", 100, 0)],
  []
);

test("no input", aft, aggregateRoundRobin, [], []);

test(
  "no single source",
  aft,
  aggregateRoundRobin,
  [sequence("A", 100, 5)],
  ["A0", "A1", "A2", "A3", "A4"]
);
