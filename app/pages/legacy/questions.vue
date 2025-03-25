<template>
  <QuestionsForm
    :questions-weights="questionsWeights"
    result-name="legacy-results"
  />
</template>

<script lang="ts" setup>
import { questionsWeights } from '~/utils/legacy/questions-weights'
</script>
