import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import Specialty from '#models/specialty'
import CreateAdminUserSeeder from './create_admin_user_seeder.js'

export default class extends BaseSeeder {
  async run() {
    // Roles básicos
    await Role.updateOrCreateMany('name', [
      {
        name: 'admin',
        description: 'Administrador del sistema'
      },
      {
        name: 'doctor',
        description: 'Doctor del sistema'
      },
      {
        name: 'patient',
        description: 'Paciente del sistema'
      }
    ])

    // Especialidades básicas
    await Specialty.updateOrCreateMany('code', [
      {
        name: 'Medicina General',
        code: 'MG',
        description: 'Medicina general y familiar'
      },
      {
        name: 'Cardiología',
        code: 'CARD',
        description: 'Especialidad que trata las enfermedades del corazón y del sistema circulatorio'
      },
      {
        name: 'Pediatría',
        code: 'PED',
        description: 'Especialidad que trata a niños y adolescentes'
      },
      {
        name: 'Dermatología',
        code: 'DERM',
        description: 'Especialidad que trata las enfermedades de la piel'
      }
    ])

    // Crear usuario administrador
    await new CreateAdminUserSeeder(this.client).run()
  }
}