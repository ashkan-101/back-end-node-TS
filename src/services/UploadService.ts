import { UploadedFile } from "express-fileupload";
import { hashFromUUID } from './HashService'
import path from "path";

const ROOT_PATH: string = process.cwd()
const CONTENT_PATH = '/public/content/'

export default class UploadService {
  constructor(){}

  public async upload(file: UploadedFile): Promise<string>{
    const fileNewName: string = this.generateNewName(file.name)
     await file.mv(path.join(ROOT_PATH, CONTENT_PATH , fileNewName))
     return fileNewName
  }

  public async uploadMany(files: UploadedFile[]): Promise<string[]>{
    const filesNewName: string[] = []
    files.forEach(async (file: UploadedFile) => {
      const fileNewName = await this.upload(file)
      filesNewName.push(fileNewName)
    });
    return filesNewName
  }

  private generateNewName(fileName: string): string{
    const fileExtension = fileName.split('.').pop() as string
    const newFileName: string = hashFromUUID()
    return `${newFileName}.${fileExtension}`
  }
}