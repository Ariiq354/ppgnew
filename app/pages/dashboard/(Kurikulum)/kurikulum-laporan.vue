<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kurikulum / Laporan");
</script>

<template>
  <Title>Kurikulum | Laporan</Title>
  <LaporanContainer bidang="kurikulum" />
</template>
