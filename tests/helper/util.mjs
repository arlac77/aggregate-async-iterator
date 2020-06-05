export async function* sequence(name, time = 100, num = 10, errIndex=-1) {
  for (let i = 0; i < num; i += 1) {
    yield new Promise((resolve,reject) => setTimeout(() => {
      if(i === errIndex) { reject(name +1); }
      else { resolve(name + i); }
    }, time));
  }
}

