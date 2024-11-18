import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'biodata'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('age').nullable()
      table.string('gender').nullable()
      table.string('highest_education_level').nullable()
      table.string('occupation').nullable()
      table.string('religion').nullable()
      table.string('relationship_status').nullable()
      table.string('country_of_origin').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
