import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateUserProfilesTable extends BaseSchema {
  protected tableName = 'user_profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('age').notNullable()
      table.string('nationality', 100).notNullable()
      table.string('city', 100).notNullable()
      table.string('address', 255).notNullable()
      table.enum('marital_status', ['soltero', 'casado', 'divorciado', 'viudo', 'union_libre']).notNullable()
      table.string('phone_number', 20).notNullable()
      table.string('emergency_contact_name', 100).notNullable()
      table.string('emergency_contact_phone', 20).notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}