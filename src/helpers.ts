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
export function* getItemsFrom(l, shuffle = true) {
  /*
    A function that creates a generator for returning random items from lists.
    
    Parameters:
    l -- a list
    shuffle -- shuffle order of items in the list (default = True)
    last -- prevent repetition of last x elements (default = None)
    */
  let m = [];
  // let p = [];
  while (true) {
    if (m.length == 0) {
      if (shuffle) {
        shuffleArray(l);
        m = [...l];
        /* if last is not None and len(p) > last:
                    while (m[0] in p[-last:]) or (p[-1] in m[:last]):
                    shuffleArray(l)
                        m = list(l) */
      } else {
        m = [...l];
      }
    }
    const i = m.pop();
    // p.push(i);
    yield i;
  }
}
