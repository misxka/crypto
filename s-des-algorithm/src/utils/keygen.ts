import { P10, P8 } from './constants';
import { concatNumbers, permute } from './string-converters';

type ShiftParams = {
  shiftAmount: number;
  leftPadding: number;
  rightPadding: number;
};

export class KeyGen {
  private inputKey: string;

  constructor(inputKey: string) {
    this.checkKey(inputKey);

    this.inputKey = inputKey;
  }

  public generateKeys(): number[] {
    this.inputKey = permute(this.inputKey, P10);

    const [leftShifted1, rightShifted1] = this.shiftCodes({ shiftAmount: 1, leftPadding: 0b01111, rightPadding: 0b10000 });
    const key1 = permute(concatNumbers(leftShifted1, rightShifted1, 5), P8);

    const [leftShifted2, rightShifted2] = this.shiftCodes({ shiftAmount: 3, leftPadding: 0b00011, rightPadding: 0b11100 });
    const key2 = permute(concatNumbers(leftShifted2, rightShifted2, 5), P8);

    return [parseInt(key1, 2), parseInt(key2, 2)];
  }

  private checkKey(key: string): void {
    const format = /^[01]{10}$/g;
    if (!format.test(key)) throw new Error('Key should consist of 0 or 1 and be 10 characters long');
  }

  private getKeyParts(key: number): number[] {
    const left = (key >> 5) & 0b11111;
    const right = key & 0b11111;

    return [left, right];
  }

  private shiftCodes({ shiftAmount, leftPadding, rightPadding }: ShiftParams): number[] {
    const [left, right] = this.getKeyParts(parseInt(this.inputKey, 2));

    const leftShifted = ((left & leftPadding) << shiftAmount) | ((left & rightPadding) >> (5 - shiftAmount));
    const rightShifted = ((right & leftPadding) << shiftAmount) | ((right & rightPadding) >> (5 - shiftAmount));

    return [leftShifted, rightShifted];
  }
}
