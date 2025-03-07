<template>
  <div class="container mx-auto max-w-[50rem]">
    <img src="/images/politiscales_cover.png" class="h-64 m-auto mt-5" />

    <p v-html="$t('description')" class="my-5" />

    <UAlert
      v-for="alert in alerts"
      :key="alert.i18nKey"
      :description="$t(alert.i18nKey)"
      class="mb-3"
      :color="alert.color"
      variant="soft"
    >
      <template #leading>
        <Icon :name="`line-md:${alert.icon}`" class="text-xl" />
      </template>
    </UAlert>

    <div class="flex justify-center mt-5">
      <UButton
        :to="$localePath('questions')"
        :label="$t('start_test')"
        color="primary"
        size="xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const alerts = [
  {
    i18nKey: 'info_1',
    icon: 'compass-loop',
    color: 'primary'
  },
  {
    i18nKey: 'info_2',
    icon: 'chat-round-dots',
    color: 'secondary'
  },
  {
    i18nKey: 'warning',
    icon: 'alert-loop',
    color: 'warning'
  }
] as const
</script>
