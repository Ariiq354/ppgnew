<script setup lang="ts">
  import type { DataReturn } from "../types";

  const openModel = defineModel<boolean>("open");

  defineProps<{
    data: DataReturn | undefined;
  }>();
</script>

<template>
  <UModal v-model:open="openModel" title="Detail Kelas" class="max-w-4xl">
    <template #body>
      <div class="space-y-4">
        <UFormField label="Kelas Pengajian">
          <UInput :model-value="data?.nama" disabled />
        </UFormField>
        <UFormField label="Keterangan">
          <UInput :model-value="data?.keterangan" disabled />
        </UFormField>
        <UFormField label="Tanggal">
          <UInput :model-value="data?.tanggal" type="date" disabled />
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
