import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateMedicalConsultationsTable extends BaseSchema {
  protected tableName = 'medical_consultations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('appointment_id').unsigned().references('id').inTable('appointments').onDelete('CASCADE').notNullable()
      table.integer('patient_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('doctor_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()

      // Datos vitales
      table.decimal('weight', 5, 2).nullable().comment('Peso en kg')
      table.decimal('height', 5, 2).nullable().comment('Altura en cm')
      table.decimal('temperature', 4, 1).nullable().comment('Temperatura en °C')
      table.integer('blood_pressure_systolic').nullable().comment('Presión arterial sistólica')
      table.integer('blood_pressure_diastolic').nullable().comment('Presión arterial diastólica')
      table.integer('heart_rate').nullable().comment('Frecuencia cardíaca')
      table.integer('oxygen_saturation').nullable().comment('Saturación de oxígeno en %')

      // Diagnóstico y tratamiento
      table.text('symptoms').nullable().comment('Síntomas reportados')
      table.text('diagnosis').nullable().comment('Diagnóstico médico')
      table.text('treatment').nullable().comment('Tratamiento prescrito')
      table.text('prescription').nullable().comment('Medicamentos recetados')
      table.text('notes').nullable().comment('Notas adicionales')

      // Seguimiento
      table.boolean('requires_follow_up').defaultTo(false)
      table.dateTime('follow_up_date').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}