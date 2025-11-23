<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { genderEnum, statusPengajarEnum } from "~~/shared/enum";
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
    :title="(state!.id ? 'Edit' : 'Tambah') + ' Proker'"
    class="max-w-4xl"
  >
    <template #body>
      <UForm
        id="form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        accept="image/png,image/jpeg,image/webp"
        @submit="onSubmit"
      >
        <UFormField label="Foto Diri" name="foto">
          <AppUploadImage
            v-model:file="state!.file"
            v-model:foto="state!.foto"
            :disabled="isLoading"
          />
        </UFormField>
        <UFormField label="Nama" name="nama">
          <UInput v-model="state!.nama" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Jenis Kelamin" name="gender">
          <USelectMenu
            v-model="state!.gender"
            :disabled="isLoading"
            :items="[...genderEnum]"
          />
        </UFormField>
        <UFormField label="No. Telepon" name="noTelepon">
          <UInput v-model="state!.noTelepon" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Pendidikan Terakhir" name="pendidikan">
          <UInput v-model="state!.pendidikan" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Status" name="status">
          <USelectMenu
            v-model="state!.status"
            :disabled="isLoading"
            :items="[...statusPengajarEnum]"
          />
        </UFormField>
        <UFormField label="Tempat Lahir" name="tempatLahir">
          <UInput v-model="state!.tempatLahir" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Tanggal Lahir" name="tanggalLahir">
          <UInput
            v-model="state!.tanggalLahir"
            type="date"
            :disabled="isLoading"
          />
        </UFormField>
        <UFormField label="Tanggal Mulai Tugas Awal" name="tanggalTugas">
          <UInput
            v-model="state!.tanggalTugas"
            type="date"
            :disabled="isLoading"
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
        form="form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
</template>
