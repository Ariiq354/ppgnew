<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { schema, type Schema } from "../constants";

  const openModel = defineModel<boolean>("open");

  const state = defineModel<Partial<Schema>>("state");

  defineProps<{
    isLoading: boolean;
    onSubmit: (event: FormSubmitEvent<Schema>) => Promise<void>;
  }>();
</script>

<template>
  <LazyUModal
    v-model:open="openModel"
    title="Upload Dokumen"
    description="Select a file to upload to your document library."
  >
    <template #body>
      <UForm
        id="dokumen-form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField name="file">
          <UFileUpload
            v-model="state!.file"
            label="Drop your file here"
            description="max. 5MB"
            class="min-h-48"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton
        icon="i-lucide-x"
        variant="ghost"
        :disabled="isLoading"
        @click="openModel = false"
      >
        Batal
      </UButton>
      <UButton
        type="submit"
        icon="i-lucide-check"
        :loading="isLoading"
        form="dokumen-form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
</template>
