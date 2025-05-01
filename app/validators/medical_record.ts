import vine from '@vinejs/vine'

export const createMedicalRecordValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    bloodType: vine.string().trim().optional(),
    height: vine.number().optional(),
    weight: vine.number().optional(),
    allergies: vine.array(vine.number()).optional(),
    chronicConditions: vine.array(vine.string()).optional(),
    medications: vine.array(vine.string()).optional(),
    familyHistory: vine.string().trim().optional(),
    notes: vine.string().trim().optional()
  })
)

export const updateMedicalRecordValidator = vine.compile(
  vine.object({
    bloodType: vine.string().trim().optional(),
    height: vine.number().optional(),
    weight: vine.number().optional(),
    allergies: vine.array(vine.number()).optional(),
    chronicConditions: vine.array(vine.string()).optional(),
    medications: vine.array(vine.string()).optional(),
    familyHistory: vine.string().trim().optional(),
    notes: vine.string().trim().optional()
  })
)