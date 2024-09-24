import { compareSync, hashSync } from "bcrypt";

export default class PasswordService {
  public hashPassword(plainPassword: string): string{
    return hashSync(plainPassword, 10)
  }
  public comparePassword(plainPassword: string, hashedPassword: string): boolean{
    return compareSync(plainPassword, hashedPassword)
  }
} 