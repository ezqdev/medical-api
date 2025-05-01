import type { HttpContext } from '@adonisjs/core/http'
import UserProfile from '#models/user_profile'
import { createUserProfileValidator, updateUserProfileValidator } from '#validators/user_profile'

export default class UserProfilesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const profiles = await UserProfile.query()
      .preload('user')
      .paginate(page, limit)

    return response.ok(profiles)
  }

  async store({ request, response }: HttpContext) {
    const data = await createUserProfileValidator.validate(request.all())
    const profile = await UserProfile.create(data)

    await profile.load('user')
    return response.created({ profile })
  }

  async show({ params, response }: HttpContext) {
    const profile = await UserProfile.query()
      .where('id', params.id)
      .preload('user')
      .firstOrFail()

    return response.ok({ profile })
  }

  async update({ params, request, response }: HttpContext) {
    const profile = await UserProfile.findOrFail(params.id)
    const data = await updateUserProfileValidator.validate(request.all())

    await profile.merge(data).save()
    await profile.load('user')
    return response.ok({ profile })
  }

  async destroy({ params, response }: HttpContext) {
    const profile = await UserProfile.findOrFail(params.id)
    await profile.delete()

    return response.ok({ message: 'Perfil de usuario eliminado correctamente' })
  }
}