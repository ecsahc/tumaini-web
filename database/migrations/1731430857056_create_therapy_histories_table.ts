import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'therapy_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('users_id').unsigned().references('users.id').notNullable().onDelete('CASCADE')
      table.boolean('attended_therapy').nullable()
      table.integer('number_of_sessions').nullable()
      table.boolean('on_medication').nullable()
      table.boolean('on_follow_up').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
