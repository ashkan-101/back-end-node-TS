import { randomBytes } from "crypto";
import {v4 as UUIDv4} from 'uuid';

export const randomHash = (length: number = 20, ): string => {
  return randomBytes(length).toString('hex')
}

export const hashFromUUID = (): string => {
   return UUIDv4()
}
