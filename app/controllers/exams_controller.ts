import type { HttpContext } from '@adonisjs/core/http'
import Exam from '#models/exam'
import { createExamValidator, updateExamValidator } from '#validators/exam'

export default class ExamsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const exams = await Exam.query()
      .paginate(page, limit)

    return response.ok(exams)
  }

  async store({ request, response }: HttpContext) {
    const data = await createExamValidator.validate(request.all())
    const exam = await Exam.create(data)

    return response.created({ exam })
  }

  async show({ params, response }: HttpContext) {
    const exam = await Exam.findOrFail(params.id)
    return response.ok({ exam })
  }

  async update({ params, request, response }: HttpContext) {
    const exam = await Exam.findOrFail(params.id)
    const data = await updateExamValidator.validate(request.all())

    await exam.merge(data).save()
    return response.ok({ exam })
  }

  async destroy({ params, response }: HttpContext) {
    const exam = await Exam.findOrFail(params.id)
    await exam.delete()

    return response.ok({ message: 'Examen eliminado correctamente' })
  }
}