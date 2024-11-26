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

export enum Severity {
  MINIMAL = 'minimal',
  MILD = 'mild',
  MODERATE = 'moderate',
  MODERATELY_SEVERE = 'moderately_severe',
  SEVERE = 'severe',
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
