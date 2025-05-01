import type { HttpContext } from '@adonisjs/core/http'
import MedicalRecord from '#models/medical_record'
import { createMedicalRecordValidator, updateMedicalRecordValidator } from '#validators/medical_record'

export default class MedicalRecordsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const records = await MedicalRecord.query()
      .preload('user')
      .paginate(page, limit)

    return response.ok(records)
  }

  async store({ request, response }: HttpContext) {
    const data = await createMedicalRecordValidator.validate(request.all())
    const record = await MedicalRecord.create(data)

    await record.load('user')
    return response.created({ record })
  }

  async show({ params, response }: HttpContext) {
    const record = await MedicalRecord.query()
      .where('id', params.id)
      .preload('user')
      .firstOrFail()

    return response.ok({ record })
  }

  async update({ params, request, response }: HttpContext) {
    const record = await MedicalRecord.findOrFail(params.id)
    const data = await updateMedicalRecordValidator.validate(request.all())

    await record.merge(data).save()
    await record.load('user')
    return response.ok({ record })
  }

  async destroy({ params, response }: HttpContext) {
    const record = await MedicalRecord.findOrFail(params.id)
    await record.delete()

    return response.ok({ message: 'Registro médico eliminado correctamente' })
  }
}