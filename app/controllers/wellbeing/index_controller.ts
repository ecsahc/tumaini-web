import { HttpContext } from '@adonisjs/core/http'
import Mood from '#enums/mood'
import { wellbeingValidator } from '#validators/wellbeing'
import WellnessTestAttempt from '#models/wellness_test_attempt'

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
      {
        title: 'Unusual Thoughts',
        description: 'I am having unusual thoughts',
        value: Mood.UNUSUAL_THOUGHTS,
      },
    ]

    return view.render('pages/wellbeing/index', { moodOptions })
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const { mood } = await request.validateUsing(wellbeingValidator)

      switch (mood) {
        case Mood.ANXIOUS:
          await WellnessTestAttempt.create({
            userId: auth.user!.id,
            mood: Mood.ANXIOUS,
          })
          console.log(mood)
          // console.log(userId)
          return response.redirect().toRoute('assessments.gad7.show')
        case Mood.LOW:
          await WellnessTestAttempt.create({
            userId: auth.user!.id,
            mood: Mood.LOW,
          })
          console.log(mood)
          // console.log(userId)
          return response.redirect().toRoute('assessments.phq9.show')
        case Mood.UNUSUAL_THOUGHTS:
          await WellnessTestAttempt.create({
            userId: auth.user!.id,
            mood: Mood.UNUSUAL_THOUGHTS,
          })
          console.log(mood)
          // console.log(userId)
          return response.redirect().toRoute('assessments.psq.show')
        default:
          return response.redirect().back()
      }
    } catch (error) {
      console.error('Error storing wellness test attempt:', error)
      return response.redirect().back()
    }
  }
}
