<template>
  <i18n-t
    keypath="question_x_of_n"
    scope="global"
    tag="span"
    class="text-xl my-4 font-serif"
  >
    <template #x>
      <span>{{ currentQuestionNumber }}</span>
    </template>
    <template #n>
      {{ totalQuestionCount }}
    </template>
  </i18n-t>
  <h2 class="text-2xl my-4 min-h-[3lh]">
    {{ currentQuestion }}
  </h2>
  <div class="flex flex-col gap-4 mt-16 max-w-[256px] m-auto">
    <UButton
      color="strong_agree"
      size="xl"
      class="cursor-pointer"
      @click="nextQuestion(1)"
    >
      {{ $t('strong_agree') }}
    </UButton>
    <UButton
      color="agree"
      size="xl"
      class="cursor-pointer"
      @click="nextQuestion(2 / 3)"
    >
      {{ $t('agree') }}
    </UButton>
    <UButton
      color="unsure"
      size="xl"
      class="cursor-pointer"
      @click="nextQuestion(0)"
    >
      {{ $t('neutral') }}
    </UButton>
    <UButton
      color="disagree"
      size="xl"
      class="cursor-pointer"
      @click="nextQuestion(-2 / 3)"
    >
      {{ $t('disagree') }}
    </UButton>
    <UButton
      color="strong_disagree"
      size="xl"
      class="cursor-pointer"
      @click="nextQuestion(-1)"
    >
      {{ $t('strong_disagree') }}
    </UButton>

    <UButton
      v-if="currentQuestionNumber > 1"
      color="neutral"
      size="xl"
      @click="prevQuestion"
    >
      {{ $t('prev_question') }}
    </UButton>
    <UButton
      v-if="currentQuestionNumber === 1"
      color="neutral"
      size="xl"
      :to="props.legacy ? localePath('/legacy') : localePath('/')"
    >
      {{ $t('back_home') }}
    </UButton>
  </div>
</template>

<script lang="ts" setup>
import {
  axes as legacyAxes,
  axesKeys as legacyAxesKeys
} from '~/utils/legacy/axes'

const props = defineProps<{
  legacy?: boolean
  questionsWeights: QuestionWeights
}>()

const localePath = useLocalePath()
const {
  currentQuestion,
  currentQuestionNumber,
  prevQuestion,
  nextQuestion,
  totalQuestionCount
} = useQuestionsState(
  props.legacy ? legacyAxes : {},
  props.legacy ? legacyAxesKeys : [],
  props.legacy ? 'legacy-results' : 'results',
  props.questionsWeights
)
</script>
