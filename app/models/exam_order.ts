import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Exam from './exam.js'
import Appointment from './appointment.js'

export default class ExamOrder extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare doctorId: number

  @column()
  declare patientId: number

  @column()
  declare status: 'pending' | 'in_progress' | 'completed' | 'cancelled'

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'doctorId',
  })
  declare doctor: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'patientId',
  })
  declare patient: BelongsTo<typeof User>

  @manyToMany(() => Exam, {
    pivotTable: 'exam_order_exams',
    pivotColumns: ['result_file', 'status']
  })
  declare exams: ManyToMany<typeof Exam>

  @hasOne(() => Appointment)
  declare appointment: HasOne<typeof Appointment>
}