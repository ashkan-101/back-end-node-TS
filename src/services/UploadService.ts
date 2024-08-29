import { UploadedFile } from "express-fileupload";
import { hashFromUUID } from './HashService'
import path from "path";

const ROOT_PATH: string = process.cwd()
const CONTENT_PATH = '/public/contents/'

export default class UploadService {
  constructor(){}

  public async upload(file: UploadedFile): Promise<string>{
    const fileNewName: string = this.generateNewName(file.name)
     await file.mv(path.join(ROOT_PATH, CONTENT_PATH , fileNewName))
     return fileNewName
  }

  public async uploadMany(files: UploadedFile[]): Promise<string[]>{
    const filesNewName: string[] = []
    for (let index = 0; index < files.length; index++) {
      const fileNewName = await this.upload(files[index]) 
      filesNewName.push(fileNewName)
    }
    return filesNewName
  }

  private generateNewName(fileName: string): string{
    const fileExtension = fileName.split('.').pop() as string
    const newFileName: string = hashFromUUID()
    return `${newFileName}.${fileExtension}`
  }
}