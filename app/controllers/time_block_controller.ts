import type { HttpContext } from '@adonisjs/core/http'
import TimeBlock from '#models/time_block'
import { createTimeBlockValidator, updateTimeBlockValidator } from '#validators/time_block'

export default class TimeBlockController {
  public async index({ request, response }: HttpContext) {
    const { doctorId, startDate, endDate } = request.qs()

    const query = TimeBlock.query()
      .preload('doctor')
      .preload('specialty')

    if (doctorId) {
      query.where('doctorId', doctorId)
    }

    if (startDate && endDate) {
      query.whereBetween('date', [startDate, endDate])
    }

    const timeBlocks = await query.exec()
    return response.json(timeBlocks)
  }

  public async store({ request, response }: HttpContext) {
    const data = await createTimeBlockValidator.validate(request.all())
    const timeBlock = await TimeBlock.create(data)

    return response.created(timeBlock)
  }

  public async show({ params, response }: HttpContext) {
    const timeBlock = await TimeBlock.findOrFail(params.id)
    await timeBlock.load('doctor')
    await timeBlock.load('specialty')
    return response.json(timeBlock)
  }

  public async update({ params, request, response }: HttpContext) {
    const timeBlock = await TimeBlock.findOrFail(params.id)
    const data = await updateTimeBlockValidator.validate(request.all())

    await timeBlock.merge(data).save()
    return response.json(timeBlock)
  }

  public async destroy({ params, response }: HttpContext) {
    const timeBlock = await TimeBlock.findOrFail(params.id)
    await timeBlock.delete()
    return response.noContent()
  }
}