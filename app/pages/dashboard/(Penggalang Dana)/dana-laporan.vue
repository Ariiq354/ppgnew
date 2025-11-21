<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Penggalang Dana / Laporan");
</script>

<template>
  <Title>Penggalang Dana | Laporan</Title>
  <LaporanContainer bidang="penggalang_dana" />
</template>
