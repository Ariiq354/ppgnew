<script setup lang="ts">
  const searchModel = defineModel<string>();

  const searchDebounced = useDebounceFn((v) => {
    searchModel.value = v;
  }, 500);
</script>

<template>
  <UInput
    class="flex-5"
    leading-icon="i-lucide-search"
    placeholder="Search..."
    @update:model-value="searchDebounced"
  />
</template>
