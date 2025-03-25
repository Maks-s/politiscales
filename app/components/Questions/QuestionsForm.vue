<script lang="ts" setup>
import { axes, axesKeys } from '~/utils/legacy/axes'

const { t } = useI18n()
const { encodeResultsStr } = useSerializer()
const questionsState = useQuestionsState()
const localePath = useLocalePath()

const props = defineProps<{
  questionsWeights: QuestionWeights
  resultName: string
}>()

const currentQuestion = computed(() =>
  t(
    `questions.${questionsIds.value[questionsState.value.currentQuestionIndex]}`
  )
)
const currentQuestionId = computed(() => {
  return questionsIds.value[questionsState.value.currentQuestionIndex]
})

const questionsIds = computed(() => {
  return Object.keys(props.questionsWeights)
})

interface Score {
  val: number
  sum: number
}

const quizResults = computed<AxisValues>(() => {
  // First calculate raw scores as before
  const scores = axesKeys.reduce(
    (acc, axis) => {
      acc[axis] = { val: 0, sum: 0 }
      return acc
    },
    {} as Record<string, Score>
  )

  Object.entries(questionsState.value.answers).forEach(
    ([questionId, answerValue]) => {
      if (answerValue > 0) {
        props.questionsWeights[questionId]?.valuesYes.forEach((a) => {
          ;(scores[a.axis] as Score).val += answerValue * a.value
          ;(scores[a.axis] as Score).sum += Math.max(a.value, 0)
        })
      } else {
        props.questionsWeights[questionId]?.valuesNo.forEach((a) => {
          ;(scores[a.axis] as Score).val -= answerValue * a.value
          ;(scores[a.axis] as Score).sum += Math.max(a.value, 0)
        })
      }
    }
  )

  // Normalize paired axes
  const pairedAxes: { [key: string]: string[] } = {}
  axesKeys.forEach((axis) => {
    const axe = axes[axis as keyof typeof axes]
    if ('pair' in axe) {
      if (!pairedAxes[axe.pair]) {
        pairedAxes[axe.pair] = []
      }
      pairedAxes[axe.pair]!.push(axis)
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
})

const prevQuestion = () => {
  if (questionsState.value.currentQuestionIndex > 0) {
    questionsState.value.currentQuestionIndex--
  }
}

const nextQuestion = (mult: number) => {
  if (!currentQuestionId.value) {
    return
  }
  questionsState.value.answers[currentQuestionId.value] = mult
  if (
    questionsState.value.currentQuestionIndex ===
    questionsIds.value.length - 1
  ) {
    navigateTo(
      localePath({
        name: props.resultName,
        hash: `#${encodeResultsStr(quizResults.value)}`
      })
    )
    questionsState.value.currentQuestionIndex = 0
    questionsState.value.answers = {}
  } else {
    questionsState.value.currentQuestionIndex++
  }
}
</script>

<template>
  <i18n-t
    keypath="question_x_of_n"
    scope="global"
    tag="span"
    class="text-xl my-4 font-serif"
  >
    <template #x>
      <span>{{ questionsState.currentQuestionIndex + 1 }}</span>
    </template>
    <template #n>
      {{ questionsIds.length }}
    </template>
  </i18n-t>
  <h2 class="text-2xl my-4 min-h-[3lh]">
    {{ currentQuestion }}
  </h2>
  <div class="flex flex-col gap-4 mt-16 max-w-[256px] m-auto">
    <UButton
      color="strong_agree"
      size="xl"
      @click="nextQuestion(1)"
      class="cursor-pointer"
    >
      {{ $t('strong_agree') }}
    </UButton>
    <UButton
      color="agree"
      size="xl"
      @click="nextQuestion(2 / 3)"
      class="cursor-pointer"
    >
      {{ $t('agree') }}
    </UButton>
    <UButton
      color="unsure"
      size="xl"
      @click="nextQuestion(0)"
      class="cursor-pointer"
    >
      {{ $t('neutral') }}
    </UButton>
    <UButton
      color="disagree"
      size="xl"
      @click="nextQuestion(-2 / 3)"
      class="cursor-pointer"
    >
      {{ $t('disagree') }}
    </UButton>
    <UButton
      color="strong_disagree"
      size="xl"
      @click="nextQuestion(-1)"
      class="cursor-pointer"
    >
      {{ $t('strong_disagree') }}
    </UButton>

    <UButton
      v-if="questionsState.currentQuestionIndex > 0"
      color="neutral"
      size="xl"
      @click="prevQuestion"
    >
      {{ $t('prev_question') }}
    </UButton>
    <UButton
      v-if="questionsState.currentQuestionIndex === 0"
      color="neutral"
      size="xl"
      to="/"
    >
      {{ $t('back_home') }}
    </UButton>
  </div>
</template>
