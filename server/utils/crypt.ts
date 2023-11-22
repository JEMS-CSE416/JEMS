import {createCipheriv, createDecipheriv} from "crypto"
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export function encryptEmailPass(email: string, pass: string): string{
  const cipher = createCipheriv(
    'aes-256-cbc',
    process.env["CRYPT_SECRET"],
    process.env["CRYPT_IV"],
  )
  return cipher.update(`${email},${pass}`, 'utf8', 'hex') + cipher.final('hex')
}

export function decryptEmailPass(crypt: string): {email: string, pass: string}{
  const decipher = createDecipheriv(
    'aes-256-cbc',
    process.env["CRYPT_SECRET"],
    process.env["CRYPT_IV"],
  )
  const text = decipher.update( crypt, 'hex', 'utf8') + decipher.final('utf8')
  return ({
    email: text.split(',')[0],
    pass: text.split(',')[1]
  })
}

export function hashPassword(pass: string): string{
    return bcrypt.hashSync(pass, SALT_ROUNDS)
}

export function matches(attempt: string, hash: string): boolean{
    return bcrypt.compareSync(attempt, hash)
}
