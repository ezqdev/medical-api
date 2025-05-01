import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateAppointmentsTable extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('patient_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('doctor_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.dateTime('appointment_date').notNullable()
      table.string('status', 20).notNullable().defaultTo('pending').comment('pending, confirmed, cancelled, completed')
      table.string('notes', 500).nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}