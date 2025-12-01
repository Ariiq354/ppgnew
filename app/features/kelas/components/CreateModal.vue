<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { schema, type Schema } from "../constants";
  import { kelasGenerusEnum } from "~~/shared/enum";

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
        id="kelas-kelompok-form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Kelas Pengajian" name="nama">
          <USelectMenu
            v-model="state!.nama"
            :disabled="isLoading"
            :items="[...kelasGenerusEnum]"
          />
        </UFormField>
        <UFormField label="Keterangan" name="keterangan">
          <UInput v-model="state!.keterangan" :disabled="isLoading" />
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
        form="kelas-kelompok-form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
</template>
