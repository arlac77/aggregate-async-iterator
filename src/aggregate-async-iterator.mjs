/**
 * Aggregate items from sevaral iterators into one.
 * Items are collected first in first out from the sources.
 * Whatever source comes first will be delivered first.
 * @param {AsyncItarator<any>[]} sources
 * @return {AsyncItarator<any>} items collected from all sources
 */
export async function* aggregateFifo(sources) {
  const queue = [];

  while (sources.length > 0) {
    queue.length = 0;

    await new Promise((resolve, reject) =>
      sources.map((s, i) =>
        s
          .next()
          .then(r => {
            if (r.done) {
              sources.splice(i, 1);
            } else {
              queue.push(r.value);
            }
            resolve();
          })
          .catch(f => reject(f))
      )
    );

    for (const r of queue) {
      yield r;
    }
  }
}

/**
 * Aggregate items from sevaral iterators into one.
 * Items are collected round robin from the sources.
 * @param {AsyncItarator<any>[]} sources
 * @return {AsyncItarator<any>} items collected from all sources
 */
export async function* aggregateRoundRobin(sources) {
  do {
    const results = await Promise.all(sources.map(s => s.next()));

    for (const i in results) {
      const r = results[i];

      if (r.done) {
        sources.splice(i, 1);
      } else {
        yield r.value;
      }
    }
  } while (sources.length > 0);
}

export default aggregateFifo;
