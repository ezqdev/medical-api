import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare age: number

  @column()
  declare nationality: string

  @column()
  declare city: string

  @column()
  declare address: string

  @column()
  declare maritalStatus: 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'union_libre'

  @column()
  declare phoneNumber: string

  @column()
  declare emergencyContactName: string

  @column()
  declare emergencyContactPhone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}