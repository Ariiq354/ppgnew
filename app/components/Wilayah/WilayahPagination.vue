<script lang="ts" setup>
  const props = defineProps<{
    total: number;
  }>();

  const page = defineModel<number>("page", { default: 1 });
  const totalPages = computed(() => Math.ceil(props.total / 5));
</script>

<template>
  <UButton
    icon="i-lucide-chevron-left"
    variant="outline"
    size="xl"
    :disabled="page === 1"
    @click="page--"
  />
  <div>Page {{ page }} of {{ totalPages }}</div>
  <UButton
    icon="i-lucide-chevron-right"
    variant="outline"
    size="xl"
    :disabled="page >= totalPages"
    @click="page++"
  />
</template>
