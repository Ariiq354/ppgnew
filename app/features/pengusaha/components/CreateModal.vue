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
    :title="(state!.id ? 'Edit' : 'Tambah') + ' Pengusaha'"
    class="max-w-4xl"
  >
    <template #body>
      <UForm
        id="pengusaha-form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Nama Pengusaha" name="nama">
          <UInput v-model="state!.nama" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Bidang Pekerjaan" name="bidangPekerjaan">
          <UInput v-model="state!.bidangPekerjaan" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Nama Usaha" name="namaUsaha">
          <UInput v-model="state!.namaUsaha" :disabled="isLoading" />
        </UFormField>
        <UFormField label="No Telepon" name="noTelepon">
          <UInput v-model="state!.noTelepon" :disabled="isLoading" />
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
        form="pengusaha-form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
</template>
