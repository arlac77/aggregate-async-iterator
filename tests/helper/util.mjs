import { aggregateFifo } from "aggregate-async-iterator";

export async function* sequence(name, time = 100, num = 10, errIndex = -1) {
  for (let i = 0; i < num; i += 1) {
    yield new Promise((resolve, reject) =>
      setTimeout(() => {
        if (i === errIndex) {
          reject(name + i);
        } else {
          resolve(name + i);
        }
      }, time)
    );
  }
}

function generateSequences(x) {
  return Array.isArray(x) ? sequence(...x) : x;
}

export async function aft(t, aggregator, input, expected, failed) {
  const results = [];

  input;
  try {
    for await (const r of aggregator(input.map(x => generateSequences(x)))) {
      results.push(r);
    }
  } catch (e) {
    t.is(e, failed);
  }

  t.deepEqual(results, expected);
}


aft.title = (providedTitle = "", aggregator, input, expected, failed = "") =>
  `aggregate ${
    aggregator === aggregateFifo ? "fifo" : "round robin"
  } ${providedTitle} ${input.map(s=>s.join(':')).join(',')} -> ${expected.length === 0 ? 'empty' : expected} ${failed ? 'failed at ' + failed :''}`.trim();
