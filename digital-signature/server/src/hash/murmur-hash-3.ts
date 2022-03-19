export class MurmurHash3 {
  private seed: number;

  constructor(seed) {
    this.seed = seed;
  }

  public hash(input: string) {
    const c1 = 0xcc9e2d51;
    const c2 = 0x1b873593;

    let curLength = input.length;
    let length = curLength;
    let h1 = this.seed;
    let k1 = 0;

    let currentIndex = 0;

    while (curLength >= 4) {
      k1 = input.charCodeAt(currentIndex++) | (input.charCodeAt(currentIndex++) << 8) | (input.charCodeAt(currentIndex++) << 16) | (input.charCodeAt(currentIndex++) << 24);

      k1 = this.multiply32(k1, c1);
      k1 = this.rotl32(k1, 15);
      k1 = this.multiply32(k1, c2);

      h1 ^= k1;
      h1 = this.rotl32(h1, 13);
      h1 = this.multiply32(h1, 5) + 0xe6546b64;

      curLength -= 4;
    }

    k1 = 0;

    if ((curLength & 3) > 0) {
      switch (curLength) {
        case 3:
          k1 = input.charCodeAt(currentIndex++) | (input.charCodeAt(currentIndex++) << 8) | (input.charCodeAt(currentIndex++) << 16);
          break;
        case 2:
          k1 = input.charCodeAt(currentIndex++) | (input.charCodeAt(currentIndex++) << 8);
          break;
        case 1:
          k1 = input.charCodeAt(currentIndex++);
          break;
      }

      k1 = this.multiply32(k1, c1);
      k1 = this.rotl32(k1, 15);
      k1 = this.multiply32(k1, c2);
      h1 ^= k1;
    }

    h1 ^= length;

    h1 ^= h1 >>> 16;
    h1 = this.multiply32(h1, 0x85ebca6b);
    h1 ^= h1 >>> 13;
    h1 = this.multiply32(h1, 0xc2b2ae35);
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
  }

  private rotl32(x, r) {
    return (x << r) | (x >>> (32 - r));
  }

  private multiply32(a, b) {
    return (a & 0xffff) * b + ((((a >>> 0x10) * b) & 0xffff) << 0x10);
  }
}
