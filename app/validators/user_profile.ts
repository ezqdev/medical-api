import vine from '@vinejs/vine'

export const createUserProfileValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    phone: vine.string().trim().optional(),
    address: vine.string().trim().optional(),
    city: vine.string().trim().optional(),
    state: vine.string().trim().optional(),
    country: vine.string().trim().optional(),
    postalCode: vine.string().trim().optional(),
    dateOfBirth: vine.date().optional(),
    gender: vine.enum(['male', 'female', 'other'] as const).optional(),
    emergencyContact: vine.string().trim().optional(),
    emergencyPhone: vine.string().trim().optional()
  })
)

export const updateUserProfileValidator = vine.compile(
  vine.object({
    phone: vine.string().trim().optional(),
    address: vine.string().trim().optional(),
    city: vine.string().trim().optional(),
    state: vine.string().trim().optional(),
    country: vine.string().trim().optional(),
    postalCode: vine.string().trim().optional(),
    dateOfBirth: vine.date().optional(),
    gender: vine.enum(['male', 'female', 'other'] as const).optional(),
    emergencyContact: vine.string().trim().optional(),
    emergencyPhone: vine.string().trim().optional()
  })
)