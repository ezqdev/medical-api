import vine from '@vinejs/vine'

export const createExamValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    code: vine.string().trim().minLength(2).maxLength(20),
    description: vine.string().trim().optional(),
    price: vine.number().min(0)
  })
)

export const updateExamValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    code: vine.string().trim().minLength(2).maxLength(20).optional(),
    description: vine.string().trim().optional(),
    price: vine.number().min(0).optional()
  })
)