import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    // Crear rol PATIENT
    await Role.create({
      name: 'PATIENT',
      description: 'Paciente del sistema médico con acceso a sus registros y citas'
    })
  }
}