import {faker} from '@faker-js/faker'
import User from '../../components/users/model/User'
import IUser from '../../components/users/model/IUser'

export async function create(count: number = 1, params?: Partial<IUser>) {
  const users: IUser[] = []
  for (let index = 1; index <= count; index++){
    const defaultUserParams = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      mobile: faker.phone.number(),
      totalOrders: 0,
      wallet: 0,
      addresses: []
    }
  
    const userParams = {...defaultUserParams, ...params}
  
    const newUser = new User(userParams)
    await newUser.save()
    users.push(newUser)
  }
  return users
}