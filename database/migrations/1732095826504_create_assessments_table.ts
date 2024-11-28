import { Severity } from '#enums/assessment_scores'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'assessments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.enum('type', ['PHQ9', 'GAD7', 'PSQ']).notNullable()
      table.integer('score')
      table.json('answers')
      table.timestamp('created_at')
      table.enum('severity', Object.values(Severity)).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
