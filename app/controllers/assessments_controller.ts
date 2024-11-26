import { HttpContext } from '@adonisjs/core/http'
import { phq9Validator, gad7Validator } from '#validators/assessment'
import Assessment from '#models/assessment'
import { PHQ9_SEVERITY, GAD7_SEVERITY, Severity } from '#enums/assessment_scores'

export default class AssessmentsController {
  private getSeverityLevel(score: number, type: 'PHQ9' | 'GAD7'): Severity {
    const ranges = type === 'PHQ9' ? PHQ9_SEVERITY : GAD7_SEVERITY

    for (const [severity, range] of Object.entries(ranges)) {
      if (score >= range.min && score <= range.max) {
        return severity as Severity
      }
    }
    return Severity.MINIMAL // fallback to minimal if there is no match
  }

  async showPhq9({ view }: HttpContext) {
    return view.render('pages/assessments/phq9')
  }

  async showGad7({ view }: HttpContext) {
    return view.render('pages/assessments/gad7')
  }

  async storePhq9({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(phq9Validator)
    const score = Object.values(data).reduce((sum, val) => sum + Number(val), 0)
    const severity = this.getSeverityLevel(score, 'PHQ9')
    const answers = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, Number(value)])
    )

    await Assessment.create({
      userId: auth.user!.id,
      type: 'PHQ9',
      score,
      severity,
      answers,
    })

    console.log({ score, severity, answers })

    return response.redirect().toRoute('/')
  }

  async storeGad7({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(gad7Validator)
    const score = Object.values(data).reduce((sum, val) => sum + Number(val), 0)
    const severity = this.getSeverityLevel(score, 'GAD7')
    const answers = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, Number(value)])
    )

    await Assessment.create({
      userId: auth.user!.id,
      type: 'GAD7',
      score,
      severity,
      answers,
    })

    console.log({ score, severity, answers })

    return response.redirect().toRoute('/')
  }
}
