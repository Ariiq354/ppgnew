<script setup lang="ts">
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
        <UFormField label="Nama">
          <UInput :model-value="data?.nama" disabled />
        </UFormField>
        <UFormField label="Jenis Kelamin">
          <UInput :model-value="data?.gender" disabled />
        </UFormField>
        <UFormField label="No. Telepon">
          <UInput :model-value="data?.noTelepon" disabled />
        </UFormField>
        <UFormField label="Pendidikan Terakhir">
          <UInput :model-value="data?.pendidikan" disabled />
        </UFormField>
        <UFormField label="Status">
          <UInput :model-value="data?.status" disabled />
        </UFormField>
        <UFormField label="Tempat Lahir">
          <UInput :model-value="data?.tempatLahir" disabled />
        </UFormField>
        <UFormField label="Tanggal Lahir">
          <UInput :model-value="data?.tanggalLahir" type="date" disabled />
        </UFormField>
        <UFormField label="Tanggal Mulai Tugas Awal">
          <UInput :model-value="data?.tanggalTugas" type="date" disabled />
        </UFormField>
      </div>
    </template>
    <template #footer>
      <UButton icon="i-lucide-x" variant="ghost" @click="openModel = false">
        Tutup
      </UButton>
    </template>
  </UModal>
</template>
