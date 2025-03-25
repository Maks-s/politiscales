<template>
  <QuestionsForm :questions-weights="questionsWeights" result-name="results" />
</template>

<script lang="ts" setup>
import { questionsWeights } from '~/utils/new/questions-weights'
</script>
