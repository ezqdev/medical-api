import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateUserAllergiesTable extends BaseSchema {
  protected tableName = 'user_allergies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('allergy_id').unsigned().references('id').inTable('allergies').onDelete('CASCADE').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // Índice compuesto para evitar duplicados
      table.unique(['user_id', 'allergy_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}