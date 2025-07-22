<script lang="ts" setup>
  const props = defineProps<{
    total: number;
  }>();

  const page = defineModel<number>("page", { default: 1 });
  const totalPages = computed(() => Math.ceil(props.total / 5));
</script>

<template>
  <UButton
    variant="outline"
    size="xl"
    class="p-2"
    :disabled="page === 1"
    @click="page--"
  >
    <UIcon name="i-heroicons-chevron-left" class="h-5 w-5" />
  </UButton>
  <div>Page {{ page }} of {{ totalPages }}</div>
  <UButton
    variant="outline"
    size="xl"
    class="p-2"
    :disabled="page === totalPages"
    @click="page++"
  >
    <UIcon name="i-heroicons-chevron-right" class="h-5 w-5" />
  </UButton>
</template>
