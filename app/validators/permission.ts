import vine from '@vinejs/vine'

export const createPermissionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50),
    description: vine.string().trim().optional(),
    slug: vine.string().trim().minLength(2).maxLength(50).regex(/^[a-z0-9-]+$/)
  })
)

export const updatePermissionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50).optional(),
    description: vine.string().trim().optional(),
    slug: vine.string().trim().minLength(2).maxLength(50).regex(/^[a-z0-9-]+$/).optional()
  })
)