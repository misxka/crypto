import { generateRandomPrimes, getOpenedExp, getClosedExp, getCharCodesFromString, encrypt, getStringFromCharCodes, decrypt } from './utils';

const { p, q } = generateRandomPrimes(1024);

const r = p.multiply(q);

const phi = p.minus(1).multiply(q.minus(1));

const e = getOpenedExp(1, phi);
const d = getClosedExp(e, phi);

const publicKey = { e, r };
const privateKey = { d, r };

const message = 'Hello world!';
const encodedMessage = getCharCodesFromString(message);

const encryptedMessage = encrypt(encodedMessage, e, r);

const decryptedMessage = decrypt(encryptedMessage, d, r);

const decodedMessage = getStringFromCharCodes(decryptedMessage);

console.log(decodedMessage);
