/**
 * Flatten a multidimensional object
 * where there is object with the same property
 * ex: { language: language: [...] } => { language: [...] }
 */
export const flattenObject = (obj) => {
  let flattened = {};

  for (const key in obj) {
    if (typeof obj[key] == "object") {
      flattened = {
        ...flattened,
        ...obj[key],
      };
    } else {
      flattened[key] = obj[key];
    }
  }

  return flattened;
};

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// random item from a list generator
export function* getItemsFrom(l, shuffle = true, last = null) {
  /*
    A function that creates a generator for returning random items from lists.
    
    Parameters:
    l -- a list
    shuffle -- shuffle order of items in the list (default = true)
    last -- prevent repetition of last x elements (default = null)
    */
  let m = [];
  const p = [];
  while (true) {
    if (m.length == 0) {
      if (shuffle) {
        shuffleArray(l);
        m = [...l];
        if (last !== null && p.length > last) {
          while (
            p.slice(0, last + 1).includes(m[0]) ||
            m.slice(0, m.length).includes(p[p.length - 1])
          ) {
            shuffleArray(l);
            m = [...l];
          }
        }
      } else {
        m = [...l];
      }
    }
    const i = m.pop();
    p.push(i);
    yield i;
  }
}

// Returns current time
export function now() {
  return new Date().getTime();
}

// Returns time elapsed since `beginning`
export function elapsed(beginning, log = false) {
  const duration = new Date().getTime() - beginning;
  if (log) {
    console.log(`${beginning}, ${duration / 1000}s`);
  }
  return duration / 1000;
}
