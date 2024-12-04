// // import type { HttpContext } from '@adonisjs/core/http'

// import { AssessmentType } from "#enums/assessment_scores"
// import Assessment from "#models/assessment"
// import WellnessTestAttempt from "#models/wellness_test_attempt"

// export default class BaseStatsController {
//   // Query number of wellness attempts by mood type
//   anxiousAttempts = await WellnessTestAttempt.query().where('mood', 'ANXIOUS').count('* as total')

//   // Query number of GAD7 assessments
//   gad7Assessments = await Assessment.query().where('type', AssessmentType.GAD7).count('* as total')

//   // Get unique users who took PHQ9
//   uniquePhq9Users = await Assessment.query()
//     .where('type', AssessmentType.PHQ9)
//     .distinct('user_id')
//     .count('* as total')

//   // Get assessments with severity breakdown
//   severityBreakdown = await Assessment.query()
//     .where('type', AssessmentType.GAD7)
//     .groupBy('severity')
//     .count('* as total')

//   // Get user's assessment history
//   userHistory = await Assessment.query().where('user_id', userId).orderBy('created_at', 'desc')

//   // Get average scores by assessment type
//   averageScores = await Assessment.query().groupBy('type').avg('score as average')
// }
