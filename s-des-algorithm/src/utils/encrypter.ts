import { EP, IIP, IP, P4, S1, S2 } from './constants';
import { concatNumbers, permute, splitChunks, splitMiddle, switchStringParts } from './string-converters';

export class Encrypter {
  private text: string;

  private key1: number;

  private key2: number;

  constructor(text: string, key1: number, key2: number) {
    this.text = text;
    this.key1 = key1;
    this.key2 = key2;

    this.encryptChunk = this.encryptChunk.bind(this);
    this.decryptChunk = this.decryptChunk.bind(this);
  }

  public encrypt(): string {
    const chunks = splitChunks(this.text);
    const encryptedChunks = chunks.map(this.encryptChunk);
    return encryptedChunks.reduce((prev, current) => prev + current, '');
  }

  public decrypt(): string {
    const chunks = splitChunks(this.text);
    const encryptedChunks = chunks.map(this.decryptChunk);
    return encryptedChunks.reduce((prev, current) => prev + current, '');
  }

  private encryptChunk(chunk: string): string {
    const initiallyPermuted = permute(chunk, IP);

    const mixedSequence1 = this.execRound(initiallyPermuted, this.key1);

    const switchedChunk = switchStringParts(mixedSequence1);

    const mixedSequence2 = this.execRound(switchedChunk, this.key2);

    return permute(mixedSequence2, IIP);
  }

  private decryptChunk(chunk: string): string {
    const initiallyPermuted = permute(chunk, IP);

    const mixedSequence1 = this.execRound(initiallyPermuted, this.key2);

    const switchedChunk = switchStringParts(mixedSequence1);

    const mixedSequence2 = this.execRound(switchedChunk, this.key1);

    return permute(mixedSequence2, IIP);
  }

  private execRound(s: string, key: number) {
    const [left, right] = splitMiddle(s);
    const enhancedRight = permute(right, EP);

    const xorParsed = parseInt(enhancedRight, 2) ^ key;
    const [leftXorParsed, rightXorParsed] = splitMiddle(xorParsed.toString(2));

    const leftSBoxed = S1[((parseInt(leftXorParsed, 2) & 0b1000) >> 2) | (parseInt(leftXorParsed, 2) & 0b0001)][(parseInt(leftXorParsed, 2) >> 1) & 0b0011];
    const rightSBoxed = S2[((parseInt(rightXorParsed, 2) & 0b1000) >> 2) | (parseInt(rightXorParsed, 2) & 0b0001)][(parseInt(rightXorParsed, 2) >> 1) & 0b0011];
    const sBoxedString = concatNumbers(leftSBoxed, rightSBoxed, 2);

    const permutedSBoxedString = permute(sBoxedString, P4).padStart(4, '0');

    const startSequence = (parseInt(permutedSBoxedString, 2) ^ parseInt(left, 2)).toString(2).padStart(4, '0');

    return (startSequence + right).padStart(8, '0');
  }
}
