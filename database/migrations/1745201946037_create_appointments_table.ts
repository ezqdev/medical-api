import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('patient_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('doctor_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('type', 20).notNullable().defaultTo('consultation') // consultation o exam
      table.integer('exam_order_exam_id').unsigned().references('id').inTable('exam_order_exams').onDelete('CASCADE').nullable()
      table.timestamp('appointment_date').notNullable()
      table.string('status', 20).notNullable().defaultTo('pending')
      table.text('notes').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}