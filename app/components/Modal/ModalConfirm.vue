<script lang="ts" setup>
  const props = defineProps<{
    function: () => Promise<void>;
  }>();

  const emit = defineEmits(["close"]);

  const loading = ref(false);
  async function onClick() {
    loading.value = true;
    try {
      await props.function();
      emit("close", false);
    } catch (error: any) {
      useToastError("Delete Failed", error.message);
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :ui="{ body: 'sm:max-w-lg' }"
    title="Confirm"
  >
    <template #body>
      <div class="space-y-5">
        <div class="flex items-center gap-4">
          <UIcon name="i-heroicons-exclamation-triangle" size="36" />
          Are you sure you want to delete the selected products?
        </div>
      </div>
    </template>
    <template #footer>
      <UButton
        icon="i-heroicons-x-mark-16-solid"
        :disabled="loading"
        class="text-base"
        variant="ghost"
        color="success"
        @click="emit('close')"
      >
        No
      </UButton>
      <UButton
        icon="i-heroicons-check-16-solid"
        :loading="loading"
        color="error"
        class="text-base"
        @click="onClick"
      >
        Yes
      </UButton>
    </template>
  </UModal>
</template>
