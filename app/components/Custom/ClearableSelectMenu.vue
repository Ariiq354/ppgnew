<script setup lang="ts">
  defineProps<{
    items: any[] | undefined;
    placeholder?: string;
    labelKey?: string;
    valueKey?: string;
    loading?: boolean;
  }>();

  const model = defineModel<string>();
</script>

<template>
  <USelectMenu
    v-model="model"
    :items="items"
    :placeholder="placeholder"
    :label-key="labelKey"
    :value-key="valueKey"
    :loading="loading"
  >
    <template #trailing="{ modelValue }">
      <UIcon
        v-if="modelValue"
        name="i-lucide-x"
        size="16"
        class="cursor-pointer text-gray-400 hover:text-red-500"
        @click.stop="model = ''"
      />
    </template>
  </USelectMenu>
</template>
