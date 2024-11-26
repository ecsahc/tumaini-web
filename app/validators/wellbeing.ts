import vine from '@vinejs/vine'
import Mood from '#enums/mood'

export const wellbeingValidator = vine.compile(
  vine.object({
    mood: vine.enum(Object.values(Mood)),
  })
)
