import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission'
import { createPermissionValidator, updatePermissionValidator } from '#validators/permission'

export default class PermissionsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const permissions = await Permission.query()
      .preload('roles')
      .paginate(page, limit)

    return response.ok(permissions)
  }

  async store({ request, response }: HttpContext) {
    const data = await createPermissionValidator.validate(request.all())
    const permission = await Permission.create(data)

    await permission.load('roles')
    return response.created({ permission })
  }

  async show({ params, response }: HttpContext) {
    const permission = await Permission.query()
      .where('id', params.id)
      .preload('roles')
      .firstOrFail()

    return response.ok({ permission })
  }

  async update({ params, request, response }: HttpContext) {
    const permission = await Permission.findOrFail(params.id)
    const data = await updatePermissionValidator.validate(request.all())

    await permission.merge(data).save()
    await permission.load('roles')
    return response.ok({ permission })
  }

  async destroy({ params, response }: HttpContext) {
    const permission = await Permission.findOrFail(params.id)
    await permission.delete()

    return response.ok({ message: 'Permiso eliminado correctamente' })
  }
}