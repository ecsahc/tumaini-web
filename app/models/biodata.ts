import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import EducationLevel from '#enums/education_level'
import Religions from '#enums/religions'
import Genders from '#enums/genders'
import Relationship from '#enums/relationship_status'
import Countries from '#enums/countries'

export default class Biodata extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare dateOfBirth: DateTime

  @column()
  declare gender: Genders

  @column()
  declare religion: Religions

  @column()
  declare educationLevel: EducationLevel

  @column()
  declare occupation: string | null

  @column()
  declare relationshipStatus: Relationship

  @column()
  declare country: Countries

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
