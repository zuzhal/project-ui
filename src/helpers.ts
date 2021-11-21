/**
 * Flatten a multidimensional object
 * where there is object with the same property
 * ex: { language: language: [...] } => { language: [...] }
 */
 export const flattenObject = (obj) => {
    let flattened = {}

    for (const key in obj) {
      if(typeof obj[key] == 'object') {
        flattened = {
          ...flattened,
          ...obj[key],
        };
      } else {
        flattened[key] = obj[key];
      }
    } 
  
    return flattened
  }