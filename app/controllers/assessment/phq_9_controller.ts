import { HttpContext } from '@adonisjs/core/http'
import { phq9Validator } from '#validators/assessment'
import Assessment from '#models/assessment'
import { PHQ9_SEVERITY, Severity, AssessmentType } from '#enums/assessment_scores'

export default class Phq9Controller {
  private getSeverityLevel(score: number): Severity {
    for (const [severity, range] of Object.entries(PHQ9_SEVERITY)) {
      if (score >= range.min && score <= range.max) {
        return severity as Severity
      }
    }
    return Severity.MINIMAL
  }

  private handleSeverity(severity: Severity): string {
    switch (severity) {
      case Severity.SEVERE:
      case Severity.MODERATELY_SEVERE:
        return '/' //'crisis.resources'
      case Severity.MODERATE:
        return '/' //'counseling.request'
      case Severity.MILD:
        return '/' //'self.help'
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
    return view.render('pages/assessments/phq9')
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(phq9Validator)
      const { score, answers } = this.processData(data)
      const severity = this.getSeverityLevel(score)

      await Assessment.create({
        userId: auth.user!.id,
        type: AssessmentType.PHQ9,
        score,
        severity,
        answers,
      })

      console.log('PHQ9 Assessment:', { score, severity, answers })
      const redirectRoute = this.handleSeverity(severity)
      return response.redirect().toRoute(redirectRoute)
    } catch (error) {
      console.error('PHQ9 Assessment Error:', error)
      return response.redirect().back()
    }
  }
}
