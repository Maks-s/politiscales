<template>
  <div class="px-12 sm:px-32">
    <div class="w-full mx-auto max-w-[50rem]">
      <h1 class="text-2xl font-bold pb-3" v-text="$t('whoarewe')" />

      <p class="block pb-8" v-text="$t('long_desc')" />

      <div v-for="(axis, index) in axes" :key="index" class="pb-8">
        <h1
          class="text-2xl font-bold pb-3"
          v-text="$t(`axis_${index + 1}_title`)"
        />
        <div class="flex relative">
          <img :src="`/images/${axis.left}.png`" class="axis-logo" />
          <div
            class="whitespace-pre-line"
            v-text="$t(`axis_${index + 1}_desc`)"
          />
          <img :src="`/images/${axis.right}.png`" class="axis-logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const axes = [
  {
    left: 'essentialism',
    right: 'constructivism'
  },
  {
    left: 'punitive_justice',
    right: 'rehabilitative_justice'
  },
  {
    left: 'conservative',
    right: 'progressive'
  },
  {
    left: 'nationalism',
    right: 'internationalism'
  },
  {
    left: 'capitalism',
    right: 'communism'
  },
  {
    left: 'laissez_faire',
    right: 'regulation'
  },
  {
    left: 'production',
    right: 'ecology'
  },
  {
    left: 'reform',
    right: 'revolution'
  }
]
</script>

<style>
.axis-logo {
  position: absolute;
  height: 8rem;
  width: 8rem;

  &:first-child {
    left: -8rem;
  }

  &:last-child {
    right: -7.5rem;
  }
}

@media (max-width: 640px) {
  .axis-logo {
    height: 4rem;
    width: 4rem;

    &:first-child {
      left: -4rem;
    }

    &:last-child {
      right: -4rem;
    }
  }
}
</style>
