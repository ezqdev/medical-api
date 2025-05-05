import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TimeBlocks extends BaseSchema {
  protected tableName = 'time_blocks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('doctor_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('specialty_id').unsigned().references('id').inTable('specialties').onDelete('CASCADE')
      table.date('date').notNullable()
      table.time('start_time').notNullable()
      table.time('end_time').notNullable()
      table.boolean('is_available').defaultTo(true)
      table.boolean('is_recurring').defaultTo(false)
      table.enum('recurring_pattern', ['daily', 'weekly', 'monthly']).nullable()
      table.json('recurring_days').nullable() // Para almacenar días específicos en formato [1,2,3] donde 1=Lunes, 2=Martes, etc.
      table.string('notes').nullable()
      table.boolean('is_holiday').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}