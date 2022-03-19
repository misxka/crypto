import { generateRandomPrimes, getClosedExp, getOpenedExp } from './utils';

export const generateRsaKey = (bitLength: number) => {
  const { p, q } = generateRandomPrimes(bitLength / 2);
  const r = p.multiply(q);
  const phi = p.minus(1).multiply(q.minus(1));
  const e = getOpenedExp(1, phi);
  const d = getClosedExp(e, phi);

  return {
    d,
    r,
    e
  };
};
