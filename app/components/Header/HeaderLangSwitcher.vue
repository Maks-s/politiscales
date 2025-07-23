<script lang="ts" setup>
const { locale, locales, defaultLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

interface Item {
  label: string
  emoji: string
  code: (typeof locale)['value']
}

function onSelectLanguage(item: Item) {
  navigateTo(switchLocalePath(item.code), { replace: true })
}

const localesValues = locales.value as unknown as Item[]

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

<style></style>
