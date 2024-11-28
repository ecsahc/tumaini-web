import { HttpContext } from '@adonisjs/core/http'
import { phq9Validator, gad7Validator, psqValidator } from '#validators/assessment'
import Assessment from '#models/assessment'
import {
  PHQ9_SEVERITY,
  GAD7_SEVERITY,
  PSQ_SEVERITY,
  Severity,
  AssessmentType,
} from '#enums/assessment_scores'

export default class AssessmentsController {
  private getSeverityLevel(score: number, type: AssessmentType): Severity {
    const ranges =
      type === AssessmentType.PHQ9
        ? PHQ9_SEVERITY
        : type === AssessmentType.GAD7
          ? GAD7_SEVERITY
          : PSQ_SEVERITY

    for (const [severity, range] of Object.entries(ranges)) {
      if (score >= range.min && score <= range.max) {
        return severity as Severity
      }
    }
    return type === AssessmentType.PSQ ? Severity.NOT_AT_RISK : Severity.MINIMAL
  }

  async showPhq9({ view }: HttpContext) {
    return view.render('pages/assessments/phq9')
  }

  async showGad7({ view }: HttpContext) {
    return view.render('pages/assessments/gad7')
  }

  async showPsq({ view }: HttpContext) {
    return view.render('pages/assessments/psq')
  }

  private processAssessmentData(data: Record<string, any>) {
    const score = Object.values(data).reduce((sum, val) => sum + Number(val), 0)
    const answers = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, Number(value)])
    )
    return { score, answers }
  }

  async storePhq9({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(phq9Validator)
    const { score, answers } = this.processAssessmentData(data)
    const severity = this.getSeverityLevel(score, AssessmentType.PHQ9)

    await Assessment.create({
      userId: auth.user!.id,
      type: AssessmentType.PHQ9,
      score,
      severity,
      answers,
    })

    console.log({ score, severity, answers })
    return response.redirect().toRoute('/')
  }

  async storeGad7({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(gad7Validator)
    const { score, answers } = this.processAssessmentData(data)
    const severity = this.getSeverityLevel(score, AssessmentType.GAD7)

    await Assessment.create({
      userId: auth.user!.id,
      type: AssessmentType.GAD7,
      score,
      severity,
      answers,
    })

    console.log({ score, severity, answers })
    return response.redirect().toRoute('/')
  }

  async storePsq({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(psqValidator)
    const { score, answers } = this.processAssessmentData(data)
    const severity = this.getSeverityLevel(score, AssessmentType.PSQ)

    await Assessment.create({
      userId: auth.user!.id,
      type: AssessmentType.PSQ,
      score,
      severity,
      answers,
    })

    console.log({ score, severity, answers })
    return response.redirect().toRoute('/')
  }
}
