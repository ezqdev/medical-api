import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exam_order_exams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('exam_order_id').unsigned().references('id').inTable('exam_orders').onDelete('CASCADE')
      table.integer('exam_id').unsigned().references('id').inTable('exams').onDelete('CASCADE')
      table.string('result_file', 255).nullable()
      table.string('status', 20).notNullable().defaultTo('pending')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()

      // Índice compuesto para evitar duplicados
      table.unique(['exam_order_id', 'exam_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}