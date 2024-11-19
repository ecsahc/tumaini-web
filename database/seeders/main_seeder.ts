import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { new (): BaseSeeder }) {
    await new Seeder().run()
  }

  async run() {
    await this.runSeeder(await import('#database/seeders/start_seeder.js'))
    await this.runSeeder(await import('#database/seeders/admin_seeder.js'))
    await this.runSeeder(await import('#database/seeders/counselors_seeder.js'))
    await this.runSeeder(await import('#database/seeders/psychologists_seeder.js'))
    await this.runSeeder(await import('#database/seeders/users_seeder.js'))
  }
}
