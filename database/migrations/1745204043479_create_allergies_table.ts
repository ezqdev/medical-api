import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateAllergiesTable extends BaseSchema {
  protected tableName = 'allergies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).notNullable().unique()
      table.string('description', 255).nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}