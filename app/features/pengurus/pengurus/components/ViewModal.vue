<script setup lang="ts">
  import { bidangOptions } from "~~/shared/constants";
  import type { Schema } from "../constants";

  const openModel = defineModel<boolean>("open");

  defineProps<{
    data: Schema;
  }>();
</script>

<template>
  <UModal v-model:open="openModel" title="Detail Proker" class="max-w-4xl">
    <template #body>
      <div class="space-y-4">
        <UFormField label="Foto Diri">
          <AppUploadImage :file="data!.file" :foto="data!.foto" disabled />
        </UFormField>
        <UFormField label="Nama">
          <UInput :model-value="data!.nama" disabled />
        </UFormField>
        <UFormField label="Bidang">
          <USelectMenu
            :model-value="data!.bidang"
            placeholder="Pilih bidang"
            :items="bidangOptions"
            value-key="value"
            label-key="name"
            disabled
          />
        </UFormField>
        <UFormField label="Pendidikan Terakhir">
          <UInput :model-value="data!.pendidikan" disabled />
        </UFormField>
        <UFormField label="Tempat Lahir">
          <UInput :model-value="data!.tempatLahir" disabled />
        </UFormField>
        <UFormField label="Tanggal Lahir">
          <UInput :model-value="data!.tanggalLahir" type="date" disabled />
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
