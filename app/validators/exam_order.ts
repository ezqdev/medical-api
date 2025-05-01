import vine from '@vinejs/vine'

export const createExamOrderValidator = vine.compile(
  vine.object({
    doctorId: vine.number(),
    patientId: vine.number(),
    notes: vine.string().trim().optional(),
    examIds: vine.array(vine.number()).minLength(1)
  })
)

export const updateExamOrderValidator = vine.compile(
  vine.object({
    status: vine.enum(['pending', 'in_progress', 'completed', 'cancelled'] as const).optional(),
    notes: vine.string().trim().optional(),
    examIds: vine.array(vine.number()).optional(),
    results: vine.array(
      vine.object({
        examId: vine.number(),
        resultFile: vine.file({
          size: '10mb',
          extnames: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']
        })
      })
    ).optional()
  })
)