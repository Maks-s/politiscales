interface Score {
  val: number
  sum: number
}

export function getQuizResults(
  axes: Record<string, PairedAxis | UnpairedAxis>,
  axesKeys: string[],
  answers: { [key: string]: number },
  questionsWeights: QuestionWeights
): AxisValues {
  // First calculate raw scores as before
  const scores = axesKeys.reduce(
    (acc, axis) => {
      acc[axis] = { val: 0, sum: 0 }
      return acc
    },
    {} as Record<string, Score>
  )

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    if (answerValue > 0) {
      questionsWeights[questionId]?.valuesYes.forEach((a) => {
        ;(scores[a.axis] as Score).val += answerValue * a.value
        ;(scores[a.axis] as Score).sum += Math.max(a.value, 0)
      })
    } else {
      questionsWeights[questionId]?.valuesNo.forEach((a) => {
        ;(scores[a.axis] as Score).val -= answerValue * a.value
        ;(scores[a.axis] as Score).sum += Math.max(a.value, 0)
      })
    }
  })

  // Normalize paired axes
  const pairedAxes: { [key: string]: string[] } = {}
  axesKeys.forEach((axis) => {
    const axe = axes[axis as keyof typeof axes]!
    if ('pair' in axe) {
      if (!pairedAxes[axe.pair!]) {
        pairedAxes[axe.pair!] = []
      }
      pairedAxes[axe.pair!]!.push(axis)
    }
  })

  // For each pair, ensure their sum doesn't exceed 100%
  Object.values(pairedAxes).forEach((pair) => {
    const [axis1, axis2] = pair as [string, string]
    const value1 = (scores[axis1]!.val / scores[axis1]!.sum) * 100
    const value2 = (scores[axis2]!.val / scores[axis2]!.sum) * 100

    if (value1 + value2 > 100) {
      const ratio = 100 / (value1 + value2)
      scores[axis1]!.val *= ratio
      scores[axis2]!.val *= ratio
    }
  })

  // Convert to percentages
  return Object.entries(scores).reduce((acc, [axis, score]) => {
    acc[axis] = (score.val / score.sum) * 100
    return acc
  }, {} as AxisValues)
}
