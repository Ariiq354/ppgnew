<script setup lang="ts">
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
        <UFormField label="Nama Musyawarah" name="nama">
          <UInput :model-value="data?.nama" disabled />
        </UFormField>
        <UFormField label="Tanggal" name="tanggal">
          <UInput :model-value="data?.tanggal" disabled type="date" />
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
