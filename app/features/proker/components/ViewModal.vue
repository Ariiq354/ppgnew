<script setup lang="ts">
  import { bulanEnum, statusProkerEnum } from "~~/shared/enum";
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
        <UFormField label="Minggu Ke">
          <UInput :model-value="data?.mingguKe" type="number" disabled />
        </UFormField>
        <UFormField label="Bulan">
          <USelectMenu
            :model-value="data?.bulan"
            placeholder="Pilih bulan"
            :items="[...bulanEnum]"
            disabled
          />
        </UFormField>
        <UFormField label="Tahun">
          <UInput :model-value="data?.tahun" disabled type="number" />
        </UFormField>
        <UFormField label="Peserta">
          <UInput :model-value="data?.peserta" disabled />
        </UFormField>
        <UFormField label="Biaya">
          <UInput :model-value="data?.biaya" type="number" disabled />
        </UFormField>
        <UFormField label="Kegiatan">
          <UTextarea :model-value="data?.kegiatan" disabled />
        </UFormField>
        <UFormField label="Keterangan">
          <UTextarea :model-value="data?.keterangan" disabled />
        </UFormField>
        <UFormField label="Status">
          <USelectMenu
            :model-value="data?.status"
            placeholder="Pilih status"
            :items="[...statusProkerEnum]"
            disabled
          />
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
