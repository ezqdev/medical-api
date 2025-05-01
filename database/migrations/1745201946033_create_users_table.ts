import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.string('document_type', 20).notNullable()
      table.string('document_number', 20).notNullable().unique()
      table.string('phone', 20).nullable()
      table.string('address', 255).nullable()
      table.date('birth_date').nullable()
      table.string('gender', 10).nullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL')
      table.integer('specialty_id').unsigned().references('id').inTable('specialties').onDelete('SET NULL').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}