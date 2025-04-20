<template>
  <QuestionsForm :questions-weights="questionsWeights" />
</template>

<script lang="ts" setup>
import { questionsWeights } from '~/utils/new/questions-weights'
</script>
