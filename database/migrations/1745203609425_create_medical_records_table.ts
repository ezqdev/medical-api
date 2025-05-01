import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateMedicalRecordsTable extends BaseSchema {
  protected tableName = 'medical_records'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.decimal('weight', 5, 2).notNullable().comment('Peso en kilogramos')
      table.decimal('height', 3, 2).notNullable().comment('Altura en metros')
      table.decimal('bmi', 4, 2).notNullable().comment('Índice de Masa Corporal')
      table.decimal('body_fat_percentage', 4, 2).notNullable().comment('Porcentaje de grasa corporal')
      table.string('blood_type', 3).notNullable().comment('Tipo de sangre (A+, A-, B+, B-, AB+, AB-, O+, O-)')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}