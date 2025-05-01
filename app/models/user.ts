import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo, hasOne, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo, HasOne, ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import MedicalRecord from './medical_record.js'
import UserProfile from './user_profile.js'
import Allergy from './allergy.js'
import Appointment from './appointment.js'
import MedicalConsultation from './medical_consultation.js'
import ExamOrder from './exam_order.js'
import Specialty from './specialty.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare roleId: number | null

  @column()
  declare documentType: string

  @column()
  declare documentNumber: string

  @column()
  declare phone: string | null

  @column()
  declare address: string | null

  @column.date()
  declare birthDate: DateTime | null

  @column()
  declare gender: string | null

  @column()
  declare specialtyId: number | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Specialty)
  declare specialty: BelongsTo<typeof Specialty>

  @hasOne(() => MedicalRecord)
  declare medicalRecord: HasOne<typeof MedicalRecord>

  @hasOne(() => UserProfile)
  declare profile: HasOne<typeof UserProfile>

  @manyToMany(() => Allergy, {
    pivotTable: 'user_allergies',
  })
  declare allergies: ManyToMany<typeof Allergy>

  @hasMany(() => Appointment, {
    foreignKey: 'patientId',
  })
  declare patientAppointments: HasMany<typeof Appointment>

  @hasMany(() => Appointment, {
    foreignKey: 'doctorId',
  })
  declare doctorAppointments: HasMany<typeof Appointment>

  @hasMany(() => MedicalConsultation, {
    foreignKey: 'patientId',
  })
  declare patientConsultations: HasMany<typeof MedicalConsultation>

  @hasMany(() => MedicalConsultation, {
    foreignKey: 'doctorId',
  })
  declare doctorConsultations: HasMany<typeof MedicalConsultation>

  @hasMany(() => ExamOrder, {
    foreignKey: 'patientId',
  })
  declare patientExamOrders: HasMany<typeof ExamOrder>

  @hasMany(() => ExamOrder, {
    foreignKey: 'doctorId',
  })
  declare doctorExamOrders: HasMany<typeof ExamOrder>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}