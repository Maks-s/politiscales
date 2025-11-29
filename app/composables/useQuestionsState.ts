export const useQuestionsState = (
  axes: Record<string, PairedAxis | UnpairedAxis>,
  axesKeys: string[],
  resultPage: string,
  questionsWeights: QuestionWeights
) => {
  const { t } = useI18n()
  const { encodeResultsStr } = useSerializer()
  const localePath = useLocalePath()

  // Seed changes each hour
  const seed = Math.floor(Date.now() / 1000 / 3600)
  const random = splitmix32(seed)

  const answers = ref({} as { [key: string]: number })
  const currentQuestionIndex = ref(0)

  const questionsIds = computed(() => {
    const ids = Object.keys(questionsWeights)
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1))
      ;[ids[i], ids[j]] = [ids[j], ids[i]] as [string, string]
    }
    return ids
  })

  const currentQuestionId = computed(
    () => questionsIds.value[currentQuestionIndex.value]
  )

  const currentQuestion = computed(() =>
    t(`questions.${currentQuestionId.value}`)
  )

  const currentQuestionNumber = ref(1)
  function nextQuestion(answer: number) {
    answers.value[currentQuestionId.value!] = answer

    if (currentQuestionIndex.value === questionsIds.value.length - 1) {
      navigateTo(
        localePath({
          name: resultPage,
          hash: `#${encodeResultsStr(getQuizResults(axes, axesKeys, answers.value, questionsWeights))}`
        })
      )
      return
    }

    currentQuestionNumber.value++
    currentQuestionIndex.value++
  }

  function prevQuestion() {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
      currentQuestionNumber.value--
    }
  }

  return {
    currentQuestion,
    currentQuestionNumber,
    nextQuestion,
    prevQuestion,
    totalQuestionCount: questionsIds.value.length
  }
}

function splitmix32(a: number) {
  return function () {
    a |= 0
    a = (a + 0x9e3779b9) | 0
    let t = a ^ (a >>> 16)
    t = Math.imul(t, 0x21f0aaad)
    t = t ^ (t >>> 15)
    t = Math.imul(t, 0x735a2d97)
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296
  }
}
