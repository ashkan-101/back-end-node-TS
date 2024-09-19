import IMailMessage from "./IMailMessage";

export default interface IMailer {
  send(message: IMailMessage): void
}