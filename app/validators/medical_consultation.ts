import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createMedicalConsultationValidator = vine.compile(
  vine.object({
    appointmentId: vine.number(),
    patientId: vine.number(),
    doctorId: vine.number(),
    weight: vine.number().optional(),
    height: vine.number().optional(),
    temperature: vine.number().optional(),
    bloodPressureSystolic: vine.number().optional(),
    bloodPressureDiastolic: vine.number().optional(),
    heartRate: vine.number().optional(),
    oxygenSaturation: vine.number().optional(),
    symptoms: vine.string().optional(),
    diagnosis: vine.string().optional(),
    treatment: vine.string().optional(),
    prescription: vine.string().optional(),
    notes: vine.string().optional(),
    requiresFollowUp: vine.boolean().optional(),
    followUpDate: vine.date({ formats: { utc: true } }).transform((date) => date ? DateTime.fromJSDate(date) : null).optional()
  })
)

export const updateMedicalConsultationValidator = vine.compile(
  vine.object({
    weight: vine.number().optional(),
    height: vine.number().optional(),
    temperature: vine.number().optional(),
    bloodPressureSystolic: vine.number().optional(),
    bloodPressureDiastolic: vine.number().optional(),
    heartRate: vine.number().optional(),
    oxygenSaturation: vine.number().optional(),
    symptoms: vine.string().optional(),
    diagnosis: vine.string().optional(),
    treatment: vine.string().optional(),
    prescription: vine.string().optional(),
    notes: vine.string().optional(),
    requiresFollowUp: vine.boolean().optional(),
    followUpDate: vine.date({ formats: { utc: true } }).transform((date) => date ? DateTime.fromJSDate(date) : null).optional()
  })
)