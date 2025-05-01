import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import ExamOrder from './exam_order.js'
import Exam from './exam.js'
import Appointment from './appointment.js'

export default class ExamOrderExam extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare examOrderId: number

  @column()
  declare examId: number

  @column()
  declare resultFile: string | null

  @column()
  declare status: 'pending' | 'in_progress' | 'completed' | 'cancelled'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => ExamOrder)
  declare examOrder: BelongsTo<typeof ExamOrder>

  @belongsTo(() => Exam)
  declare exam: BelongsTo<typeof Exam>

  @hasOne(() => Appointment)
  declare appointment: HasOne<typeof Appointment>
}