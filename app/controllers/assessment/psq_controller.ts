import { HttpContext } from '@adonisjs/core/http'
import { psqValidator } from '#validators/assessment'
import Assessment from '#models/assessment'
import { PSQ_SEVERITY, Severity, AssessmentType } from '#enums/assessment_scores'

export default class PsqController {
  private getSeverityLevel(score: number): Severity {
    for (const [severity, range] of Object.entries(PSQ_SEVERITY)) {
      if (score >= range.min && score <= range.max) {
        return severity as Severity
      }
    }
    return Severity.NOT_AT_RISK
  }

  private handleSeverity(severity: Severity): string {
    switch (severity) {
      case Severity.AT_RISK:
        return '/' //'emergency.contact'
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
    return view.render('pages/assessments/psq')
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(psqValidator)
      const { score, answers } = this.processData(data)
      const severity = this.getSeverityLevel(score)

      await Assessment.create({
        userId: auth.user!.id,
        type: AssessmentType.PSQ,
        score,
        severity,
        answers,
      })

      console.log('PSQ Assessment:', { score, severity, answers })
      const redirectRoute = this.handleSeverity(severity)
      return response.redirect().toRoute(redirectRoute)
    } catch (error) {
      console.error('PSQ Assessment Error:', error)
      return response.redirect().back()
    }
  }
}
