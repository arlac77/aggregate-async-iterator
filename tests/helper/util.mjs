export async function* sequence(name, time = 100, num = 10) {
  for (let i = 0; i < num; i += 1) {
    yield new Promise(resolve => setTimeout(() => { resolve(name + i);}, time));
  }
}

