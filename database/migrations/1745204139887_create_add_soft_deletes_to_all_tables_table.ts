import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddSoftDeletesToAllTables extends BaseSchema {
  protected tableName = 'add_soft_deletes_to_all_tables'

  async up() {
    // Agregar soft deletes a la tabla users
    this.schema.alterTable('users', (table) => {
      table.timestamp('deleted_at').nullable()
    })

    // Agregar soft deletes a la tabla roles
    this.schema.alterTable('roles', (table) => {
      table.timestamp('deleted_at').nullable()
    })

    // Agregar soft deletes a la tabla medical_records
    this.schema.alterTable('medical_records', (table) => {
      table.timestamp('deleted_at').nullable()
    })

    // Agregar soft deletes a la tabla user_profiles
    this.schema.alterTable('user_profiles', (table) => {
      table.timestamp('deleted_at').nullable()
    })

    // Agregar soft deletes a la tabla allergies
    this.schema.alterTable('allergies', (table) => {
      table.timestamp('deleted_at').nullable()
    })

    // Agregar soft deletes a la tabla user_allergies
    this.schema.alterTable('user_allergies', (table) => {
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    // Remover soft deletes de la tabla users
    this.schema.alterTable('users', (table) => {
      table.dropColumn('deleted_at')
    })

    // Remover soft deletes de la tabla roles
    this.schema.alterTable('roles', (table) => {
      table.dropColumn('deleted_at')
    })

    // Remover soft deletes de la tabla medical_records
    this.schema.alterTable('medical_records', (table) => {
      table.dropColumn('deleted_at')
    })

    // Remover soft deletes de la tabla user_profiles
    this.schema.alterTable('user_profiles', (table) => {
      table.dropColumn('deleted_at')
    })

    // Remover soft deletes de la tabla allergies
    this.schema.alterTable('allergies', (table) => {
      table.dropColumn('deleted_at')
    })

    // Remover soft deletes de la tabla user_allergies
    this.schema.alterTable('user_allergies', (table) => {
      table.dropColumn('deleted_at')
    })
  }
}