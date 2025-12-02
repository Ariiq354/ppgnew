<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { schema, type Schema } from "../constants";
  import {
    genderEnum,
    pengajianEnum,
    sekolahEnum,
    statusGenerusEnum,
  } from "~~/shared/enum";

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
    :title="(state!.id ? 'Edit' : 'Tambah') + ' Generus'"
    class="max-w-4xl"
  >
    <template #body>
      <UForm
        id="generus-form"
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
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <UFormField label="No Telepon" name="noTelepon">
            <UInput v-model="state!.noTelepon" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Nama Ayah/Ibu" name="namaOrtu">
            <UInput v-model="state!.namaOrtu" :disabled="isLoading" />
          </UFormField>
          <UFormField label="No Telepon Ayah/Ibu" name="noTeleponOrtu">
            <UInput v-model="state!.noTeleponOrtu" :disabled="isLoading" />
          </UFormField>
          <UFormField label="Kelas Sekolah" name="kelasSekolah">
            <USelectMenu
              v-model="state!.kelasSekolah"
              :disabled="isLoading"
              :items="[...sekolahEnum]"
            />
          </UFormField>
          <UFormField label="Kelas Pengajian" name="kelasPengajian">
            <USelectMenu
              v-model="state!.kelasPengajian"
              :disabled="isLoading"
              :items="[...pengajianEnum]"
            />
          </UFormField>
          <UFormField label="Status" name="status">
            <USelectMenu
              v-model="state!.status"
              multiple
              :disabled="isLoading"
              :items="[...statusGenerusEnum]"
            />
          </UFormField>
        </div>
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
        form="generus-form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
</template>
