<script setup lang="ts">
  defineProps<{
    percent: string;
    title: string;
    subtitle: string;
  }>();
</script>

<template>
  <UCard>
    <div class="flex h-full flex-col justify-between">
      <p class="text-lg font-semibold">{{ title }}</p>
      <p class="text-2xl font-bold">
        {{ percent + " %" }}
      </p>
      <p>{{ subtitle }}</p>
    </div>
  </UCard>
</template>
