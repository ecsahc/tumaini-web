import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '../../app/enums/roles.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    // node ace db:seed --files=./database/seeders/start_seeder.ts
    await Role.createMany([
      {
        id: Roles.USER,
        name: 'User',
      },
      {
        id: Roles.PEER_COUNSELOR,
        name: 'Peer Counselor',
      },
      {
        id: Roles.PRACTICING_PSYCHOLOGIST,
        name: 'Practicing Psychologist',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])
  }
}
