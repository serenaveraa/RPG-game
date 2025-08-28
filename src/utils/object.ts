export function omitUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const output: Partial<T> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - index signature narrow
      output[key] = value;
    }
  }
  return output;
}


