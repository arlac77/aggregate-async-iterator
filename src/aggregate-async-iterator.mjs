/**
 *
 * @param {AsyncItarator<any>[]} sources
 */
export async function* aggregate(sources) {
  for (const s of sources) {
    yield* s;
  }
}

export default aggregate;

async function* sequence(inc) {
  for (let i = 0; i < 50; i += inc) {
    yield i;
  }
}

async function doit() {
  for await (const r of aggregate([sequence(3), sequence(5), sequence(7)])) {
    console.log(r);
  }
}

doit();
