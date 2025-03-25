export interface QuestionWeights {
  [key: string]: {
    valuesYes: { axis: string; value: number }[]
    valuesNo: { axis: string; value: number }[]
  }
}
