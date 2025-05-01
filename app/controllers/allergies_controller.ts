import type { HttpContext } from '@adonisjs/core/http'
import Allergy from '#models/allergy'
import { createAllergyValidator, updateAllergyValidator } from '#validators/allergy'

export default class AllergiesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const allergies = await Allergy.query()
      .paginate(page, limit)

    return response.ok(allergies)
  }

  async store({ request, response }: HttpContext) {
    const data = await createAllergyValidator.validate(request.all())
    const allergy = await Allergy.create(data)

    return response.created({ allergy })
  }

  async show({ params, response }: HttpContext) {
    const allergy = await Allergy.findOrFail(params.id)
    return response.ok({ allergy })
  }

  async update({ params, request, response }: HttpContext) {
    const allergy = await Allergy.findOrFail(params.id)
    const data = await updateAllergyValidator.validate(request.all())

    await allergy.merge(data).save()
    return response.ok({ allergy })
  }

  async destroy({ params, response }: HttpContext) {
    const allergy = await Allergy.findOrFail(params.id)
    await allergy.delete()

    return response.ok({ message: 'Alergia eliminada correctamente' })
  }
}