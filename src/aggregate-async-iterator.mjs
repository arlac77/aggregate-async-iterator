
/**
 * Aggregate items from sevaral iterators into one
 * Items are collected first in first out from the sources 
 * @param {AsyncItarator<any>[]} sources
 * @return {AsyncItarator<any>} items collected from all sources 
 */
export async function* aggregateFifo(sources) {
  do {
    const running = sources.map( async (s,i) => {
      const r = await s.next();
      if (r.done) {
        sources.splice(i, 1);
        running.splice(i, 1);
      } else {
        console.log("got", i, r);
        running[i] = sources[i].next();
      }
      return r;
    });
    
    const r = Promise.race(running);

    if (!r.done) {
      yield r.value;
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
