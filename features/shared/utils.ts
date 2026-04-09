export function transformData(obj: Record<string, string>): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
  
    for (const key in obj) {
      const match = key.match(/^(\w+)\[([a-z]{2}-[A-Z]{2})\]$/);
  
      if (match) {
        const [, fieldName, locale] = match;
  
        if (!result[fieldName]) {
          result[fieldName] = {};
        }
  
        result[fieldName][locale] = obj[key];
      } else {
        result[key] = { [key]: obj[key] };
      }
    }
  
    return result;
  }