import bigInt from 'big-integer';

export const generateRandomPrimes = (bitsLength: number = 1024): { p: bigInt.BigInteger; q: bigInt.BigInteger } => {
  const min = 1n << BigInt(bitsLength - 1);
  const max = (1n << BigInt(bitsLength)) - 1n;

  let p, q;
  while (true) {
    p = bigInt.randBetween(min, max);

    if (p.isProbablePrime()) {
      break;
    }
  }

  while (true) {
    q = bigInt.randBetween(min, max);

    if (q.isProbablePrime() && q !== p) {
      break;
    }
  }

  return { p, q };
};

export const getOpenedExp = (min, max) => {
  while (true) {
    const e = bigInt.randBetween(min, max);

    if (gcd(e, max).equals(1)) {
      return e;
    }
  }
};

export const getClosedExp = (e, phi) => {
  let [x1, y1] = extendedGcd(phi, e);

  while (y1.lt(0)) {
    y1 = y1.plus(phi);
  }

  return y1;
};

export const gcd = (a: bigInt.BigInteger, b: bigInt.BigInteger) => {
  let temp;
  while (b.neq(0)) {
    if (a.lt(b)) {
      temp = a;
      a = b;
      b = temp;
    }
    temp = b;
    b = a.mod(b);
    a = temp;
  }
  return a;
};

export const extendedGcd = (a: bigInt.BigInteger, b: bigInt.BigInteger) => {
  let d0 = a,
    d1 = b,
    x0 = bigInt(1),
    x1 = bigInt(0),
    y0 = bigInt(0),
    y1 = bigInt(1);

  while (d1.gt(1)) {
    const q = d0.divide(d1);
    const d2 = d0.mod(d1);
    const x2 = x0.minus(q.multiply(x1));
    const y2 = y0.minus(q.multiply(y1));
    d0 = d1;
    d1 = d2;
    x0 = x1;
    x1 = x2;
    y0 = y1;
    y1 = y2;
  }

  return [x1, y1, d1];
};

export const getCharCodesFromString = (text: string) => text.split('').map(c => c.charCodeAt(0));

export const getStringFromCharCodes = (codes: bigInt.BigInteger[]) => String.fromCharCode(...codes.map(c => c.toJSNumber()));

export const encrypt = (codes: number[], key: bigInt.BigInteger, r: bigInt.BigInteger) => codes.map(code => bigInt(code).modPow(key, r));

export const decrypt = (codes: bigInt.BigInteger[], key: bigInt.BigInteger, r: bigInt.BigInteger) => codes.map(code => code.modPow(key, r));

export const getStringFromBigints = (arr: bigInt.BigInteger[]): string => {
  return arr.reduce((prev, cur) => prev + cur.toString() + 'n', '');
};

export const getBigIntsFromString = (s: string): bigInt.BigInteger[] => {
  return s
    .split('n')
    .map(elem => bigInt(elem))
    .slice(0, -1);
};
