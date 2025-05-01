import type { HttpContext } from '@adonisjs/core/http'
import Specialty from '#models/specialty'
import { createSpecialtyValidator, updateSpecialtyValidator } from '#validators/specialty'

export default class SpecialtiesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const specialties = await Specialty.query()
      .preload('users')
      .paginate(page, limit)

    return response.ok(specialties)
  }

  async store({ request, response }: HttpContext) {
    const data = await createSpecialtyValidator.validate(request.all())
    const specialty = await Specialty.create(data)

    await specialty.load('users')

    return response.created({ specialty })
  }

  async show({ params, response }: HttpContext) {
    const specialty = await Specialty.query()
      .where('id', params.id)
      .preload('users')
      .firstOrFail()

    return response.ok({ specialty })
  }

  async update({ params, request, response }: HttpContext) {
    const specialty = await Specialty.findOrFail(params.id)
    const data = await updateSpecialtyValidator.validate(request.all())

    await specialty.merge(data).save()
    await specialty.load('users')

    return response.ok({ specialty })
  }

  async destroy({ params, response }: HttpContext) {
    const specialty = await Specialty.findOrFail(params.id)
    await specialty.delete()

    return response.ok({ message: 'Especialidad eliminada correctamente' })
  }
}