<script setup lang="ts">
  defineProps<{
    count: number;
    title: string;
    icon: string;
  }>();
</script>

<template>
  <UCard>
    <div class="flex items-center gap-4">
      <UIcon :name="icon" size="100" />
      <div
        class="flex w-full flex-col items-end justify-center gap-2 text-right"
      >
        <p class="text-2xl font-bold">{{ count }}</p>
        <p class="text-lg">{{ title }}</p>
      </div>
    </div>
  </UCard>
</template>
