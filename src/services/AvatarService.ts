import * as crypto from 'crypto'

export const buildAvatar = (email: string, size: number = 50) => {
  const hashedEmail = crypto.createHash('MD5').update(email).digest('hex')
  return `https://www.gravatar.com/avatar${hashedEmail}?=${size}`
}