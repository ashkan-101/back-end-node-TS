import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const sign = (data: any) => {
  return jwt.sign(data, process.env.APP_SECRET as string)
}

export const verify = (token: string): jwt.JwtPayload | false => {
  try {
    return jwt.verify(token, process.env.APP_SECRET as string) as jwt.JwtPayload
  } catch (error) {
    return false
  }
} 