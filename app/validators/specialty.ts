import vine from '@vinejs/vine'

export const createSpecialtyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    code: vine.string().trim().minLength(2).maxLength(20),
    description: vine.string().trim().optional()
  })
)

export const updateSpecialtyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    code: vine.string().trim().minLength(2).maxLength(20).optional(),
    description: vine.string().trim().optional()
  })
)