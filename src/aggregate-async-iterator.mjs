/**
 * Aggregate items from sevaral iterators into one
 * Items are collected first in first out from the sources
 * @param {AsyncItarator<any>[]} sources
 * @return {AsyncItarator<any>} items collected from all sources
 */
export async function* aggregateFifo(sources) {
  const queue = [];

  do {
    queue.length = 0;

    await new Promise(resolve =>
      sources.map((s, i) =>
        s.next().then(r => {
          if (r.done) {
            sources.splice(i, 1);
            resolve();
          } else {
          //  console.log(r.value, i);
            queue.push(r.value);
            resolve();
          }
        })
      )
    );

    //console.log(queue);

    for (const r of queue) {
      yield r;
    }
  } while (sources.length > 0);
}

/**
 * Aggregate items from sevaral iterators into one
 * Items are collected round robin from the sources
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
