<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kegiatan Muda-mudi / Laporan");
</script>

<template>
  <Title>Kegiatan Muda-mudi | Laporan</Title>
  <LaporanContainer bidang="kegiatan_muda_mudi" />
</template>
