import type { HttpContext } from '@adonisjs/core/http'
import Appointment from '#models/appointment'
import { createAppointmentValidator, updateAppointmentValidator } from '#validators/appointment'

export default class AppointmentsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const type = request.input('type')

    const query = Appointment.query()
      .preload('patient')
      .preload('doctor')
      .preload('consultation')
      .preload('examOrderExam', (query) => {
        query.preload('exam')
      })

    if (type) {
      query.where('type', type)
    }

    const appointments = await query.paginate(page, limit)
    return response.ok(appointments)
  }

  async store({ request, response }: HttpContext) {
    const data = await createAppointmentValidator.validate(request.all())
    const appointment = await Appointment.create(data)

    await appointment.load('patient')
    await appointment.load('doctor')
    await appointment.load('consultation')
    await appointment.load('examOrderExam', (query) => {
      query.preload('exam')
    })

    return response.created({ appointment })
  }

  async show({ params, response }: HttpContext) {
    const appointment = await Appointment.query()
      .where('id', params.id)
      .preload('patient')
      .preload('doctor')
      .preload('consultation')
      .preload('examOrderExam', (query) => {
        query.preload('exam')
      })
      .firstOrFail()

    return response.ok({ appointment })
  }

  async update({ params, request, response }: HttpContext) {
    const appointment = await Appointment.findOrFail(params.id)
    const data = await updateAppointmentValidator.validate(request.all())

    await appointment.merge(data).save()

    await appointment.load('patient')
    await appointment.load('doctor')
    await appointment.load('consultation')
    await appointment.load('examOrderExam', (query) => {
      query.preload('exam')
    })

    return response.ok({ appointment })
  }

  async destroy({ params, response }: HttpContext) {
    const appointment = await Appointment.findOrFail(params.id)
    await appointment.delete()

    return response.ok({ message: 'Cita eliminada correctamente' })
  }
}