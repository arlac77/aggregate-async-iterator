import aggregate from "aggregate-async-iterator";

async function* sequence(name, time = 100, num = 10) {
  for (let i = 0; i < num; i += 1) {
    yield new Promise(resolve => setTimeout(resolve(name + i), time));
  }
}

async function doit() {
    const results = [];

  for await (const r of aggregate([
    sequence("A", 100, 5),
    sequence("B", 50, 7)
  ])) {
    results.push(r);
  }

  /*
  [
    'A0', 'B0', 'A1',
    'B1', 'A2', 'B2',
    'A3', 'B3', 'A4',
    'B4', 'B5', 'B6'
  ]
  */
  console.log(results);
}

doit();
