import { HttpContext } from '@adonisjs/core/http'
import { gad7Validator } from '#validators/assessment'
import Assessment from '#models/assessment'
import { GAD7_SEVERITY, Severity, AssessmentType } from '#enums/assessment_scores'

export default class Gad7Controller {
  private getSeverityLevel(score: number): Severity {
    for (const [severity, range] of Object.entries(GAD7_SEVERITY)) {
      if (score >= range.min && score <= range.max) {
        return severity as Severity
      }
    }
    return Severity.MINIMAL
  }

  private handleSeverity(severity: Severity): string {
    switch (severity) {
      case Severity.SEVERE:
        return '/' //'crisis.resources'
      case Severity.MODERATE:
        return '/' //'counseling.request'
      default:
        return '/'
    }
  }

  private processData(data: Record<string, any>) {
    const score = Object.values(data).reduce((sum, val) => sum + Number(val), 0)
    const answers = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, Number(value)])
    )
    return { score, answers }
  }

  async show({ view }: HttpContext) {
    return view.render('pages/assessments/gad7')
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(gad7Validator)
      const { score, answers } = this.processData(data)
      const severity = this.getSeverityLevel(score)

      await Assessment.create({
        userId: auth.user!.id,
        type: AssessmentType.GAD7,
        score,
        severity,
        answers,
      })

      console.log('GAD7 Assessment:', { score, severity, answers })
      const redirectRoute = this.handleSeverity(severity)
      return response.redirect().toRoute(redirectRoute)
    } catch (error) {
      console.error('GAD7 Assessment Error:', error)
      return response.redirect().back()
    }
  }
}
