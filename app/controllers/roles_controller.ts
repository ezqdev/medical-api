import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import { createRoleValidator, updateRoleValidator } from '#validators/role'

export default class RolesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const roles = await Role.query()
      .paginate(page, limit)

    return response.ok(roles)
  }

  async store({ request, response }: HttpContext) {
    const data = await createRoleValidator.validate(request.all())
    const role = await Role.create(data)

    return response.created({ role })
  }

  async show({ params, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    return response.ok({ role })
  }

  async update({ params, request, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    const data = await updateRoleValidator.validate(request.all())

    await role.merge(data).save()
    return response.ok({ role })
  }

  async destroy({ params, response }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    await role.delete()

    return response.ok({ message: 'Rol eliminado correctamente' })
  }
}