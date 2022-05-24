import { UserModel } from '@modules/Users/entities/UserModel'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: UserModel[] = []

  create: IUsersRepository['create'] = async data => {
    const newUser = new UserModel()

    Object.assign(newUser, data)

    this.users.push(newUser)

    return newUser
  }

  delete: IUsersRepository['delete'] = async id => {
    const indexToDelete = this.users.findIndex(user => user.id === id)

    this.users.splice(indexToDelete, 1)
  }

  update: IUsersRepository['update'] = async data => {
    const indexOfUserToBeUpdated = this.users.findIndex(
      ({ id }) => id === data.id
    )
    let userToBeUpdated = this.users[indexOfUserToBeUpdated]

    userToBeUpdated = { ...userToBeUpdated, ...data }
  }

  findById: IUsersRepository['findById'] = async id =>
    this.users.find(user => user.id === id)

  findByEmail: IUsersRepository['findByEmail'] = async email =>
    this.users.find(user => user.email === email)

  findByUsername: IUsersRepository['findByUsername'] = async username =>
    this.users.find(user => user.username === username)

  findAll: IUsersRepository['findAll'] = async () => this.users
}

export { UsersRepositoryInMemory }
