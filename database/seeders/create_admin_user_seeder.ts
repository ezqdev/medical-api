import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Crear rol ADMIN
    const adminRole = await Role.create({
      name: 'ADMIN',
      description: 'Administrador del sistema con acceso total'
    })

    // Crear usuario administrador usando el modelo User directamente
    const user = new User()
    user.firstName = 'Admin'
    user.lastName = 'System'
    user.email = 'admin@medical.com'
    user.password = 'Admin123!'  // El modelo se encargará del hash
    user.roleId = adminRole.id
    await user.save()
  }
}