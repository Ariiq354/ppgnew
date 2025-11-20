<script setup lang="ts">
  import { statusGenerusEnum } from "~~/shared/enum";
  import type { DataReturn } from "../types";

  const openModel = defineModel<boolean>("open");

  defineProps<{
    data: DataReturn | undefined;
  }>();
</script>

<template>
  <UModal v-model:open="openModel" title="Detail Pengajar" class="max-w-4xl">
    <template #body>
      <div class="space-y-4">
        <UFormField label="Foto Diri">
          <AppUploadImage :foto="data?.foto" disabled />
        </UFormField>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <UFormField label="Nama">
            <UInput :model-value="data?.nama" disabled />
          </UFormField>
          <UFormField label="Jenis Kelamin">
            <UInput :model-value="data?.gender" disabled />
          </UFormField>
          <UFormField label="Tempat Lahir">
            <UInput :model-value="data?.tempatLahir" disabled />
          </UFormField>
          <UFormField label="Tanggal Lahir">
            <UInput :model-value="data?.tanggalLahir" type="date" disabled />
          </UFormField>
          <UFormField label="No Telepon">
            <UInput :model-value="data?.noTelepon" disabled />
          </UFormField>
          <UFormField label="Nama Ayah/Ibu">
            <UInput :model-value="data?.namaOrtu" disabled />
          </UFormField>
          <UFormField label="No Telepon Ayah/Ibu">
            <UInput :model-value="data?.noTeleponOrtu" disabled />
          </UFormField>
          <UFormField label="Kelas Sekolah">
            <UInput :model-value="data?.kelasSekolah" disabled />
          </UFormField>
          <UFormField label="Kelas Pengajian">
            <UInput :model-value="data?.kelasPengajian" disabled />
          </UFormField>
          <UFormField label="Status">
            <USelectMenu
              :model-value="data?.status"
              multiple
              disabled
              :items="[...statusGenerusEnum]"
            />
          </UFormField>
        </div>
      </div>
    </template>
    <template #footer>
      <UButton icon="i-lucide-x" variant="ghost" @click="openModel = false">
        Tutup
      </UButton>
    </template>
  </UModal>
</template>
