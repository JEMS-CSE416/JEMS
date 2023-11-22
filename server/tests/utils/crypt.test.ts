import { match } from 'assert';
import {encryptEmailPass, decryptEmailPass, matches, hashPassword} from '../../utils/crypt'

jest.mock('process', () => ({
  ...jest.requireActual('process'), // Use the actual implementation for other properties
  env: {
    CRYPT_SECRET : 'testSecret',
    CRYPT_IV : 'testIV',
  }
}));

test('Encrypt and decrypt with crypt functions', () => {
  process.env.CRYPT_SECRET = "01234567890123456789012345678901"
  process.env.CRYPT_IV = "0123456789012345"
  
  // Original plaintext
  const email = "test@gmail.com"
  const pass = "testpass"

  // Encrypt the plaintext
  const crypt = encryptEmailPass(email, pass);

  // Decrypt the ciphertext
  const obj = decryptEmailPass(crypt);

  // Check if the decrypted text matches the original plaintext
  expect(obj.email).toBe(email);
  expect(obj.pass).toBe(pass);
});

test('Hash and compare passwords', () => {
  // Original plaintext
  const pass = "testpass"

  // Hash password
  const hash = hashPassword(pass)

  // Check if password matches hash
  expect(matches(pass, hash)).toBe(true);
});
