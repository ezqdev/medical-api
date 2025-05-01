import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(50),
    lastName: vine.string().trim().minLength(2).maxLength(50),
    email: vine.string().email().unique(async (db, value) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
    roleId: vine.number().optional()
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(50).optional(),
    lastName: vine.string().trim().minLength(2).maxLength(50).optional(),
    email: vine.string().email().optional(),
    password: vine.string().minLength(8).maxLength(32).confirmed().optional(),
    roleId: vine.number().optional()
  })
)