import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Role from '#models/role'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    const adminRole = await Role.findByOrFail('name', 'admin')

    await User.updateOrCreate(
      { email: 'admin@example.com' },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: await hash.make('admin123'),
        roleId: adminRole.id,
        documentType: 'CC',
        documentNumber: '1234567890'
      }
    )
  }
}