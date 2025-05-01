import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CreateAdminUserSeeder from './create_admin_user_seeder.js'
import CreatePatientRoleSeeder from './create_patient_role_seeder.js'

export default class extends BaseSeeder {
  async run() {
    await new CreateAdminUserSeeder(this.client).run()
    await new CreatePatientRoleSeeder(this.client).run()
  }
}