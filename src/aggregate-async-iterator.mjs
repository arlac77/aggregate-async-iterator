/**
 *
 * @param {AsyncItarator<any>[]} sources
 */
export async function* aggregate(sources) {
  let running;
  do {
    running = sources.map(s => s.next());

  //  console.log(sources);
  //  console.log(running);

    const results = await Promise.all(running);

   // console.log(results);
    for (const i in results) {
      const r = results[i];

      if (r.done) {
        sources.splice(i, 1);
      }
      else {
        yield r.value;
      }
    }
  } while (sources.length > 0);
}

export default aggregate;

