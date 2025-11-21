<script setup lang="ts">
  import type { DataReturn } from "../types";

  const openModel = defineModel<boolean>("open");

  defineProps<{
    data: DataReturn | undefined;
  }>();
</script>

<template>
  <LazyUModal
    v-model:open="openModel"
    title="Detail Laporan Musyawarah Bidang"
    class="max-w-4xl"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <h1 class="text-xl font-bold">{{ data?.laporan }}</h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="prose prose-base" v-html="data?.keterangan" />
      </div>
    </template>
  </LazyUModal>
</template>
