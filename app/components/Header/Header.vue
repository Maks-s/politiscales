<template>
  <UHeader :to="rootLink">
    <template #title>
      <h1 class="font-serif">Politiscales</h1>
    </template>

    <template #right>
      <HeaderLangSwitcher />
      <UColorModeButton />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()

const rootLink = computed(() =>
  route.path.includes('/legacy') ? localePath('/legacy') : localePath('/')
)
</script>
