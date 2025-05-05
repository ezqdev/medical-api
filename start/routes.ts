/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AuthController from '#controllers/auth_controller'
import MedicalConsultationsController from '#controllers/medical_consultations_controller'
import AllergiesController from '#controllers/allergies_controller'
import RolesController from '#controllers/roles_controller'
import MedicalRecordsController from '#controllers/medical_records_controller'
import UserProfilesController from '#controllers/user_profiles_controller'
import AppointmentsController from '#controllers/appointments_controller'
import SwaggerController from '#controllers/swagger_controller'
import PermissionsController from '#controllers/permissions_controller'
import ExamsController from '#controllers/exams_controller'
import ExamOrdersController from '#controllers/exam_orders_controller'
import SpecialtiesController from '#controllers/specialties_controller'
import TimeBlockController from '#controllers/time_block_controller'

// Rutas de documentación
router.get('/docs', [SwaggerController, 'serve'])
router.get('/docs-json', [SwaggerController, 'setup'])

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Rutas de autenticación
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController, 'logout']).use(middleware.auth({}))
  router.get('/me', [AuthController, 'me']).use(middleware.auth({}))
}).prefix('/auth')

// Rutas protegidas - requieren autenticación
router.group(() => {
  // Rutas de consultas médicas
  router
    .group(() => {
      router.get('/', [MedicalConsultationsController, 'index'])
      router.post('/', [MedicalConsultationsController, 'store'])
      router.get('/:id', [MedicalConsultationsController, 'show'])
      router.put('/:id', [MedicalConsultationsController, 'update'])
      router.delete('/:id', [MedicalConsultationsController, 'destroy'])
    })
    .prefix('/medical-consultations')

  // Rutas de alergias
  router
    .group(() => {
      router.get('/', [AllergiesController, 'index'])
      router.post('/', [AllergiesController, 'store'])
      router.get('/:id', [AllergiesController, 'show'])
      router.put('/:id', [AllergiesController, 'update'])
      router.delete('/:id', [AllergiesController, 'destroy'])
    })
    .prefix('/allergies')

  // Rutas de roles
  router
    .group(() => {
      router.get('/', [RolesController, 'index'])
      router.post('/', [RolesController, 'store'])
      router.get('/:id', [RolesController, 'show'])
      router.put('/:id', [RolesController, 'update'])
      router.delete('/:id', [RolesController, 'destroy'])
    })
    .prefix('/roles')

  // Rutas de registros médicos
  router
    .group(() => {
      router.get('/', [MedicalRecordsController, 'index'])
      router.post('/', [MedicalRecordsController, 'store'])
      router.get('/:id', [MedicalRecordsController, 'show'])
      router.put('/:id', [MedicalRecordsController, 'update'])
      router.delete('/:id', [MedicalRecordsController, 'destroy'])
    })
    .prefix('/medical-records')

  // Rutas de perfiles de usuario
  router
    .group(() => {
      router.get('/', [UserProfilesController, 'index'])
      router.post('/', [UserProfilesController, 'store'])
      router.get('/:id', [UserProfilesController, 'show'])
      router.put('/:id', [UserProfilesController, 'update'])
      router.delete('/:id', [UserProfilesController, 'destroy'])
    })
    .prefix('/user-profiles')

  // Rutas de citas
  router
    .group(() => {
      router.get('/', [AppointmentsController, 'index'])
      router.post('/', [AppointmentsController, 'store'])
      router.get('/:id', [AppointmentsController, 'show'])
      router.put('/:id', [AppointmentsController, 'update'])
      router.delete('/:id', [AppointmentsController, 'destroy'])
    })
    .prefix('/appointments')

  // Rutas de permisos
  router
    .group(() => {
      router.get('/', [PermissionsController, 'index'])
      router.post('/', [PermissionsController, 'store'])
      router.get('/:id', [PermissionsController, 'show'])
      router.put('/:id', [PermissionsController, 'update'])
      router.delete('/:id', [PermissionsController, 'destroy'])
    })
    .prefix('/permissions')

  // Rutas de exámenes
  router
    .group(() => {
      router.get('/', [ExamsController, 'index'])
      router.post('/', [ExamsController, 'store'])
      router.get('/:id', [ExamsController, 'show'])
      router.put('/:id', [ExamsController, 'update'])
      router.delete('/:id', [ExamsController, 'destroy'])
    })
    .prefix('/exams')

  // Rutas de órdenes de exámenes
  router
    .group(() => {
      router.get('/', [ExamOrdersController, 'index'])
      router.post('/', [ExamOrdersController, 'store'])
      router.get('/:id', [ExamOrdersController, 'show'])
      router.put('/:id', [ExamOrdersController, 'update'])
      router.delete('/:id', [ExamOrdersController, 'destroy'])
    })
    .prefix('/exam-orders')

  // Rutas de especialidades
  router
    .group(() => {
      router.get('/', [SpecialtiesController, 'index'])
      router.post('/', [SpecialtiesController, 'store'])
      router.get('/:id', [SpecialtiesController, 'show'])
      router.put('/:id', [SpecialtiesController, 'update'])
      router.delete('/:id', [SpecialtiesController, 'destroy'])
    })
    .prefix('/specialties')

  // Rutas de bloques de tiempo
  router
    .group(() => {
      router.get('/', [TimeBlockController, 'index'])
      router.post('/', [TimeBlockController, 'store'])
      router.get('/:id', [TimeBlockController, 'show'])
      router.put('/:id', [TimeBlockController, 'update'])
      router.delete('/:id', [TimeBlockController, 'destroy'])
    })
    .prefix('/time-blocks')

}).use(middleware.auth({}))
