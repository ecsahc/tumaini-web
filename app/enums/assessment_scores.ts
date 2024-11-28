export enum PhqScores {
  NOT_AT_ALL = 0,
  SEVERAL_DAYS = 1,
  MORE_THAN_HALF = 2,
  NEARLY_EVERY_DAY = 3,
}

export enum GadScores {
  NOT_AT_ALL = 0,
  SEVERAL_DAYS = 1,
  MORE_THAN_HALF = 2,
  NEARLY_EVERY_DAY = 3,
}

export enum PsqScores {
  NO = 0,
  YES = 1,
}

export enum Severity {
  MINIMAL = 'minimal',
  MILD = 'mild',
  MODERATE = 'moderate',
  MODERATELY_SEVERE = 'moderately_severe',
  SEVERE = 'severe',
  AT_RISK = 'at_risk',
  NOT_AT_RISK = 'not_at_risk',
}

export enum AssessmentType {
  PHQ9 = 'PHQ9',
  GAD7 = 'GAD7',
  PSQ = 'PSQ',
}

export const PHQ9_SEVERITY = {
  [Severity.MINIMAL]: { min: 0, max: 4 },
  [Severity.MILD]: { min: 5, max: 9 },
  [Severity.MODERATE]: { min: 10, max: 14 },
  [Severity.MODERATELY_SEVERE]: { min: 15, max: 19 },
  [Severity.SEVERE]: { min: 20, max: 27 },
}

export const GAD7_SEVERITY = {
  [Severity.MINIMAL]: { min: 0, max: 4 },
  [Severity.MILD]: { min: 5, max: 9 },
  [Severity.MODERATE]: { min: 10, max: 14 },
  [Severity.SEVERE]: { min: 15, max: 21 },
}

export const PSQ_SEVERITY = {
  [Severity.NOT_AT_RISK]: { min: 0, max: 1 },
  [Severity.AT_RISK]: { min: 2, max: 5 },
}
