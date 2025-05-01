import type { HttpContext } from '@adonisjs/core/http'
import ExamOrder from '#models/exam_order'
import { createExamOrderValidator, updateExamOrderValidator } from '#validators/exam_order'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

export default class ExamOrdersController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const orders = await ExamOrder.query()
      .preload('doctor')
      .preload('patient')
      .preload('exams')
      .paginate(page, limit)

    return response.ok(orders)
  }

  async store({ request, response }: HttpContext) {
    const data = await createExamOrderValidator.validate(request.all())
    const { examIds, ...orderData } = data

    const order = await ExamOrder.create(orderData)
    if (examIds) {
      await order.related('exams').attach(examIds)
    }

    await order.load('doctor')
    await order.load('patient')
    await order.load('exams')

    return response.created({ order })
  }

  async show({ params, response }: HttpContext) {
    const order = await ExamOrder.query()
      .where('id', params.id)
      .preload('doctor')
      .preload('patient')
      .preload('exams')
      .firstOrFail()

    return response.ok({ order })
  }

  async update({ params, request, response }: HttpContext) {
    const order = await ExamOrder.findOrFail(params.id)
    const data = await updateExamOrderValidator.validate(request.all())
    const { examIds, results, ...orderData } = data

    await order.merge(orderData).save()

    if (examIds) {
      await order.related('exams').sync(examIds)
    }

    if (results) {
      for (const result of results) {
        const fileName = `${cuid()}.${result.resultFile.extname}`
        await result.resultFile.move(app.makePath('uploads/results'), {
          name: fileName
        })

        await order.related('exams').pivotQuery()
          .where('exam_id', result.examId)
          .update({ result_file: fileName })
      }
    }

    await order.load('doctor')
    await order.load('patient')
    await order.load('exams')

    return response.ok({ order })
  }

  async destroy({ params, response }: HttpContext) {
    const order = await ExamOrder.findOrFail(params.id)
    await order.delete()

    return response.ok({ message: 'Orden de examen eliminada correctamente' })
  }
}