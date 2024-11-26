import { HttpContext } from '@adonisjs/core/http'
import Mood from '#enums/mood'
import { wellbeingValidator } from '#validators/wellbeing'

export default class WellbeingController {
  async show({ view }: HttpContext) {
    const moodOptions = [
      {
        title: 'Okay',
        description: 'I am feeling balanced and stable',
        value: Mood.OKAY,
      },
      {
        title: 'Not Okay',
        description: 'I am experiencing some discomfort',
        value: Mood.NOT_OKAY,
      },
      {
        title: 'Anxious',
        description: 'I am feeling worried or uneasy',
        value: Mood.ANXIOUS,
      },
      {
        title: 'Low',
        description: 'I am feeling down or depressed',
        value: Mood.LOW,
      },
    ]

    return view.render('pages/wellbeing/index', { moodOptions })
  }

  async store({ request, response }: HttpContext) {
    const { mood } = await request.validateUsing(wellbeingValidator)

    switch (mood) {
      case Mood.ANXIOUS:
        return response.redirect().toRoute('assessments.gad7.show')
      case Mood.LOW:
        return response.redirect().toRoute('assessments.phq9.show')
      default:
        return response.redirect().back()
    }
  }
}
