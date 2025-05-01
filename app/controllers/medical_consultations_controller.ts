import type { HttpContext } from '@adonisjs/core/http'
import MedicalConsultation from '#models/medical_consultation'
import { createMedicalConsultationValidator, updateMedicalConsultationValidator } from '#validators/medical_consultation'

export default class MedicalConsultationsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const consultations = await MedicalConsultation.query()
      .preload('patient')
      .preload('doctor')
      .preload('appointment')
      .paginate(page, limit)

    return response.ok(consultations)
  }

  async store({ request, response }: HttpContext) {
    const data = await createMedicalConsultationValidator.validate(request.all())
    const consultation = await MedicalConsultation.create(data)

    await consultation.load('patient')
    await consultation.load('doctor')
    await consultation.load('appointment')

    return response.created({ consultation })
  }

  async show({ params, response }: HttpContext) {
    const consultation = await MedicalConsultation.query()
      .where('id', params.id)
      .preload('patient')
      .preload('doctor')
      .preload('appointment')
      .firstOrFail()

    return response.ok({ consultation })
  }

  async update({ params, request, response }: HttpContext) {
    const consultation = await MedicalConsultation.findOrFail(params.id)
    const data = await updateMedicalConsultationValidator.validate(request.all())

    await consultation.merge(data).save()
    await consultation.load('patient')
    await consultation.load('doctor')
    await consultation.load('appointment')

    return response.ok({ consultation })
  }

  async destroy({ params, response }: HttpContext) {
    const consultation = await MedicalConsultation.findOrFail(params.id)
    await consultation.delete()

    return response.ok({ message: 'Consulta eliminada correctamente' })
  }
}