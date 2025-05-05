import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createTimeBlockValidator = vine.compile(
  vine.object({
    doctorId: vine.number(),
    specialtyId: vine.number(),
    date: vine.string().transform((value) => DateTime.fromISO(value)),
    startTime: vine.string(),
    endTime: vine.string(),
    isAvailable: vine.boolean(),
    isRecurring: vine.boolean(),
    recurringPattern: vine.enum(['daily', 'weekly', 'monthly']).optional(),
    recurringDays: vine.array(vine.number()).optional(),
    notes: vine.string().optional(),
    isHoliday: vine.boolean(),
  })
)

export const updateTimeBlockValidator = vine.compile(
  vine.object({
    doctorId: vine.number().optional(),
    specialtyId: vine.number().optional(),
    date: vine.string().transform((value) => DateTime.fromISO(value)).optional(),
    startTime: vine.string().optional(),
    endTime: vine.string().optional(),
    isAvailable: vine.boolean().optional(),
    isRecurring: vine.boolean().optional(),
    recurringPattern: vine.enum(['daily', 'weekly', 'monthly']).optional(),
    recurringDays: vine.array(vine.number()).optional(),
    notes: vine.string().optional(),
    isHoliday: vine.boolean().optional(),
  })
)