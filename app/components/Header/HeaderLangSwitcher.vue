<template>
  <USelectMenu
    v-model="selected"
    :items="availableLocales"
    :search-input="false"
    @update:model-value="onSelectLanguage"
  >
    <template #leading="{ modelValue }">
      <span v-if="modelValue?.emoji" class="size-5 text-center">
        {{ modelValue?.emoji }}
      </span>
    </template>
    <template #item-leading="{ item }">
      <span v-if="item.emoji" class="size-5 text-center">
        {{ item.emoji }}
      </span>
    </template>
  </USelectMenu>
</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales, defaultLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function onSelectLanguage(item: LocaleObject) {
  navigateTo(switchLocalePath(item.code), { replace: true })
}

const localesValues = locales.value

const availableLocales = computed(() =>
  localesValues.filter((i) => i.code !== locale.value)
)

const defaultLocaleItem = localesValues.find((i) => i.code === defaultLocale)!
const selectedItem = localesValues.find((i) => i.code === locale.value)

const selected = ref({
  label: selectedItem?.label ?? defaultLocaleItem.label ?? '',
  emoji: selectedItem?.emoji ?? defaultLocaleItem.emoji ?? '',
  code: selectedItem?.code ?? defaultLocaleItem.code ?? 'en'
})
</script>

<style></style>
