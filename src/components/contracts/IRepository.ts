
export default interface IRepository {
  findOne(ID: string): any,
  findMany(params: any): any,
  create(params: any): boolean,
  updateOne(where: any, updateData: any): any,
  updateMany(where: any, updateData: any): any,
  deleteOne(where: any): any,
  deleteMany(where: any): any,
} 