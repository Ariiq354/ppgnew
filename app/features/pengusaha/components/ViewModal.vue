<script setup lang="ts">
  import type { Schema } from "../constants";

  const openModel = defineModel<boolean>("open");

  defineProps<{
    data: Schema;
  }>();
</script>

<template>
  <UModal v-model:open="openModel" title="Detail Pengusaha" class="max-w-4xl">
    <template #body>
      <div class="space-y-4">
        <UFormField label="Nama Pengusaha" name="nama">
          <UInput :model-value="data!.nama" disabled />
        </UFormField>
        <UFormField label="Bidang Pekerjaan" name="bidangPekerjaan">
          <UInput :model-value="data!.bidangPekerjaan" disabled />
        </UFormField>
        <UFormField label="Nama Usaha" name="namaUsaha">
          <UInput :model-value="data!.namaUsaha" disabled />
        </UFormField>
        <UFormField label="No Telepon" name="noTelepon">
          <UInput :model-value="data!.noTelepon" disabled />
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
