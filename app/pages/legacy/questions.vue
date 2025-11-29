<template>
  <QuestionsForm legacy :questions-weights="questionsWeights" />
</template>

<script lang="ts" setup>
import { questionsWeights } from '~/utils/legacy/questions-weights'
</script>
