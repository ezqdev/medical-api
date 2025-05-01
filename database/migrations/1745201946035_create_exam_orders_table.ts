import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exam_orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('doctor_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('patient_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
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