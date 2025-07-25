<script setup lang="ts">
  defineProps<{
    items: any[];
    placeholder?: string;
    labelKey?: string;
    valueKey?: string;
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
  >
    <template #trailing="{ modelValue }">
      <UIcon
        v-if="modelValue"
        name="i-heroicons-x-mark"
        size="16"
        class="cursor-pointer text-gray-400 hover:text-red-500"
        @click.stop="model = ''"
      />
    </template>
  </USelectMenu>
</template>
