import vine from '@vinejs/vine'

export const createAllergyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    description: vine.string().trim().optional(),
    severity: vine.enum(['low', 'medium', 'high'] as const),
    symptoms: vine.string().trim().optional()
  })
)

export const updateAllergyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    description: vine.string().trim().optional(),
    severity: vine.enum(['low', 'medium', 'high'] as const).optional(),
    symptoms: vine.string().trim().optional()
  })
)