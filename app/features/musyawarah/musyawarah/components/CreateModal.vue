<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { schema, type Schema } from "../constants";

  const openModel = defineModel<boolean>("open");

  const state = defineModel<Schema>("state");

  defineProps<{
    isLoading: boolean;
    onSubmit: (event: FormSubmitEvent<Schema>) => Promise<void>;
  }>();
</script>

<template>
  <LazyUModal
    v-model:open="openModel"
    :title="(state!.id ? 'Edit' : 'Tambah') + ' Musyawarah'"
    class="max-w-4xl"
  >
    <template #body>
      <UForm
        id="musyawarah-form"
        :schema="schema"
        :state="state!"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Nama Musyawarah" name="nama">
          <UInput v-model="state!.nama" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Tanggal" name="tanggal">
          <UInput v-model="state!.tanggal" :disabled="isLoading" type="date" />
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
        form="musyawarah-form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
</template>
