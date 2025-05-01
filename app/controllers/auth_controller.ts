import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { createUserValidator } from '#validators/user'
import { loginValidator } from '#validators/auth'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    const user = await User.create({
      ...payload,
      password: await hash.make(payload.password)
    })

    return response.created({ user })
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await loginValidator.validate(request.all())

      try {
        // Usar el método verifyCredentials del modelo User
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)
        return response.ok({ user, token })
      } catch (error) {
        console.error('Error de verificación:', error)
        return response.badRequest({
          errors: [{ message: 'Credenciales inválidas' }]
        })
      }
    } catch (error) {
      console.error('Error en validación:', error)
      return response.badRequest({
        errors: [{
          message: error.message || 'Error al intentar iniciar sesión'
        }]
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    return response.ok({ message: 'Sesión cerrada exitosamente' })
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.user
    return response.ok({ user })
  }
}