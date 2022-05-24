import { UserModel } from '../../models/UserModel'
import type { IUsersRepository } from './IUserRepository.types'

import { query } from '@shared/database'

class UsersRepository implements IUsersRepository {
  update: IUsersRepository['update'] = async data => {
    let queryData = ''

    const update = (name: string, value: string) =>
      `
        UPDATE
          users
        SET
          ${name} = '${value}'
        WHERE
          id = '${data.id}';
      `

    const dataToUpdate: string[][] = Object.entries(data)

    for (let i = 0; i < dataToUpdate.length; i++) {
      const name = dataToUpdate[i][0]
      const value = dataToUpdate[i][1]

      if (name && value) queryData = queryData + update(name, value)
    }

    await query<UserModel>(queryData)
  }

  create: IUsersRepository['create'] = async ({
    created_at,
    id,
    email,
    password,
    updated_at,
    username
  }) => {
    const queryData = `
      INSERT INTO users (
        id,
        email,
        username,
        password,
        created_at,
        updated_at
      ) VALUES (
        '${id}',
        '${email}',
        '${username}',
        '${password}',
        '${created_at}',
        '${updated_at}'
      );
    `

    await query<UserModel>(queryData)

    const createdUser = await this.findById(id)

    return createdUser
  }

  delete: IUsersRepository['delete'] = async id => {
    const queryData = `DELETE FROM Users WHERE id='${id}'`

    await query(queryData)
  }

  findAll: IUsersRepository['findAll'] = async () => {
    const queryData = 'SELECT * FROM Users'

    const allUsers = (await query<UserModel>(queryData)).rows

    return allUsers
  }

  findById: IUsersRepository['findById'] = async id => {
    const queryData = `SELECT * FROM Users WHERE id='${id}'`

    const foundUser = (await query<UserModel>(queryData)).rows[0]

    return foundUser
  }

  findByEmail: IUsersRepository['findByEmail'] = async email => {
    const queryData = `SELECT * FROM Users WHERE email='${email}'`

    const foundUser = (await query<UserModel>(queryData)).rows[0]

    return foundUser
  }

  findByUsername: IUsersRepository['findByUsername'] = async username => {
    const queryData = `SELECT * FROM Users WHERE username='${username}'`

    const foundUser = (await query<UserModel>(queryData)).rows[0]

    return foundUser
  }
}

export { UsersRepository }
