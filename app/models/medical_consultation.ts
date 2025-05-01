import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Appointment from './appointment.js'

export default class MedicalConsultation extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare appointmentId: number

  @column()
  declare patientId: number

  @column()
  declare doctorId: number

  // Datos vitales
  @column()
  declare weight: number | null

  @column()
  declare height: number | null

  @column()
  declare temperature: number | null

  @column()
  declare bloodPressureSystolic: number | null

  @column()
  declare bloodPressureDiastolic: number | null

  @column()
  declare heartRate: number | null

  @column()
  declare oxygenSaturation: number | null

  // Diagnóstico y tratamiento
  @column()
  declare symptoms: string | null

  @column()
  declare diagnosis: string | null

  @column()
  declare treatment: string | null

  @column()
  declare prescription: string | null

  @column()
  declare notes: string | null

  // Seguimiento
  @column()
  declare requiresFollowUp: boolean

  @column.dateTime()
  declare followUpDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Appointment)
  declare appointment: BelongsTo<typeof Appointment>

  @belongsTo(() => User, {
    foreignKey: 'patientId',
  })
  declare patient: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'doctorId',
  })
  declare doctor: BelongsTo<typeof User>
}