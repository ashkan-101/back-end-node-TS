
export default interface IRepository<T> {
  findOne(ID: string): Promise<T | null>,
  findMany(params: any): Promise<T[]>,
  create(params: any): Promise<T>,
  updateOne(where: Partial<T>, updateData: Partial<T>): Promise<boolean>,
  updateMany(where: Partial<T>, updateData: Partial<T>): Promise<boolean>,
  deleteOne(ID: string): Promise<boolean>,
  deleteMany(where: any): Promise<boolean>,
} 