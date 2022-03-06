export const getBinaryString = (inputString: string): [string, boolean] => {
  const inputNumber = parseInt(inputString, 2);

  if (!isNaN(inputNumber)) return [inputString, true];

  return [
    inputString
      .split('')
      .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(''),
    false
  ];
};

export const permute = (s: string, schema: number[]): string => {
  return schema.reduce((prev, current) => prev + s[current - 1], '');
};

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

export const switchStringParts = (s: string): string => {
  const [left, right] = splitMiddle(s);
  return right + left;
};

export const splitMiddle = (s: string): string[] => {
  const middle = s.length / 2;
  return [s.slice(0, middle).padStart(4, '0'), s.slice(middle).padStart(4, '0')];
};

export const concatNumbers = (left: number, right: number, length: number): string => left.toString(2).padStart(length, '0') + right.toString(2).padStart(length, '0');

export const getStringFromBinary = (result: string): string =>
  splitChunks(result)
    .map(elem => String.fromCharCode(parseInt(elem, 2)))
    .join('');
