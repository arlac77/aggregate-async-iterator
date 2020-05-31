import test from "ava";
import aggregate from "aggregate-async-iterator";

async function* sequence(name, time = 100, num = 10) {
  for (let i = 0; i < num; i += 1) {
    yield new Promise(resolve => setTimeout(resolve(name + i), time));
  }
}

test("simple", async t => {
  const results = [];

  for await (const r of aggregate([
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

test("empty", async t => {
  const results = [];

  for await (const r of aggregate([
    sequence("A", 100, 0),
    sequence("B", 100, 0)
  ])) {
    results.push(r);
  }

  t.deepEqual(results, []);
});

test("single source", async t => {
  const results = [];

  for await (const r of aggregate([
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