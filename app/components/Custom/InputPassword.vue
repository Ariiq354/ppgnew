<script setup lang="ts">
  const show = ref(false);
  const password = defineModel<string>();
  defineProps<{
    disabled?: boolean;
    loading?: boolean;
    placeholder?: string;
  }>();
</script>

<template>
  <UInput
    v-model="password"
    :placeholder
    :type="show ? 'text' : 'password'"
    :ui="{ trailing: 'pe-1' }"
    :disabled
    :loading
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :aria-pressed="show"
        aria-controls="password"
        @click="show = !show"
      />
    </template>
  </UInput>
</template>

<style>
  ::-ms-reveal {
    display: none;
  }
</style>
