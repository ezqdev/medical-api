import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import MedicalConsultation from './medical_consultation.js'
import ExamOrderExam from './exam_order_exam.js'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare patientId: number

  @column()
  declare doctorId: number

  @column()
  declare type: 'consultation' | 'exam'

  @column()
  declare examOrderExamId: number | null

  @column.dateTime()
  declare appointmentDate: DateTime

  @column()
  declare status: 'pending' | 'confirmed' | 'cancelled' | 'completed'

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'patientId',
  })
  declare patient: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'doctorId',
  })
  declare doctor: BelongsTo<typeof User>

  @hasOne(() => MedicalConsultation)
  declare consultation: HasOne<typeof MedicalConsultation>

  @belongsTo(() => ExamOrderExam)
  declare examOrderExam: BelongsTo<typeof ExamOrderExam>
}