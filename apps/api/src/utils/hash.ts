import bcrypt from 'bcrypt'

export function hash(text: string): Promise<string> {
   const SALT_ROUNDS = 10
   return bcrypt.hash(text, SALT_ROUNDS)
}

export function compare(
   plaintext: string,
   hashedText: string
): Promise<boolean> {
   return bcrypt.compare(plaintext, hashedText)
}
