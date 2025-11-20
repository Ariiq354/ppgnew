<script setup lang="ts">
  import type { SelectMenuItem } from "@nuxt/ui";

  defineProps<{
    items: SelectMenuItem[] | SelectMenuItem[][] | undefined;
    placeholder?: string;
    labelKey?: string | number;
    valueKey?: string | number;
    loading?: boolean;
  }>();

  const model = defineModel<string | number>();
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
        @click.stop="model = undefined"
      />
    </template>
  </USelectMenu>
</template>
