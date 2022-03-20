export const splitChunks = (s: string): string[] => {
  const result = [];

  if (s.length === 8) {
    result.push(s);
    return result;
  }

  for (let i = 1; i <= s.length; i++) {
    if (i % 8 === 0) {
      result.push(s.slice(i - 8, i));
    }
  }

  if (s.length % 8 !== 0) {
    result.push(s.slice(s.length - (s.length % 8)).padEnd(8, '0'));
  }

  return result;
};
