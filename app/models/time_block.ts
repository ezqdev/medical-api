import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Specialty from './specialty.js'

export default class TimeBlock extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare doctorId: number

  @column()
  declare specialtyId: number

  @column.date()
  declare date: DateTime

  @column()
  declare startTime: string

  @column()
  declare endTime: string

  @column()
  declare isAvailable: boolean

  @column()
  declare isRecurring: boolean

  @column()
  declare recurringPattern: 'daily' | 'weekly' | 'monthly' | null

  @column()
  declare recurringDays: number[] | null

  @column()
  declare notes: string | null

  @column()
  declare isHoliday: boolean

  @belongsTo(() => User)
  declare doctor: BelongsTo<typeof User>

  @belongsTo(() => Specialty)
  declare specialty: BelongsTo<typeof Specialty>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}