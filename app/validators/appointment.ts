import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createAppointmentValidator = vine.compile(
  vine.object({
    patientId: vine.number(),
    doctorId: vine.number(),
    appointmentDate: vine.date().transform((date) => DateTime.fromJSDate(date)),
    status: vine.enum(['pending', 'confirmed', 'cancelled', 'completed'] as const).optional(),
    notes: vine.string().trim().optional()
  })
)

export const updateAppointmentValidator = vine.compile(
  vine.object({
    appointmentDate: vine.date().transform((date) => date ? DateTime.fromJSDate(date) : undefined).optional(),
    status: vine.enum(['pending', 'confirmed', 'cancelled', 'completed'] as const).optional(),
    notes: vine.string().trim().optional()
  })
)