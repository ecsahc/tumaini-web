import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '../factories/user_factory.js'
import Roles from '#enums/roles'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.merge({ roleId: Roles.PEER_COUNSELOR }).createMany(2)
  }
}
