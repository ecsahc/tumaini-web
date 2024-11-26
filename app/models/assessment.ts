import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { Severity } from '#enums/assessment_scores'

export default class Assessment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare type: 'PHQ9' | 'GAD7'

  @column()
  declare score: number

  @column()
  declare severity: Severity

  @column()
  declare answers: Record<string, number>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
