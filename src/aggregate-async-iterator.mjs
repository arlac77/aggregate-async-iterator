/**
 *
 * @param {AsyncItarator<any>[]} sources
 */
export async function* aggregate(sources) {
  do {
    const running = sources.map(s => s.next());
    const results = await Promise.all(running);

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

export default aggregate;
