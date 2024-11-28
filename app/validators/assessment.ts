import vine from '@vinejs/vine'

export const phq9Validator = vine.compile(
  vine.object({
    little_interest: vine.number().range([0, 3]),
    feeling_down: vine.number().range([0, 3]),
    trouble_sleeping: vine.number().range([0, 3]),
    feeling_tired: vine.number().range([0, 3]),
    poor_appetite: vine.number().range([0, 3]),
    feeling_bad: vine.number().range([0, 3]),
    trouble_concentrating: vine.number().range([0, 3]),
    moving_slowly: vine.number().range([0, 3]),
    thoughts_of_death: vine.number().range([0, 3]),
  })
)

export const gad7Validator = vine.compile(
  vine.object({
    feeling_nervous: vine.number().range([0, 3]),
    cant_control_worrying: vine.number().range([0, 3]),
    worrying_too_much: vine.number().range([0, 3]),
    trouble_relaxing: vine.number().range([0, 3]),
    being_restless: vine.number().range([0, 3]),
    easily_annoyed: vine.number().range([0, 3]),
    feeling_afraid: vine.number().range([0, 3]),
  })
)

export const psqValidator = vine.compile(
  vine.object({
    hypomania: vine.number().range([0, 1]),
    thought_insertion: vine.number().range([0, 1]),
    paranoia: vine.number().range([0, 1]),
    strange_experiences: vine.number().range([0, 1]),
    hallucinations: vine.number().range([0, 1]),
  })
)
