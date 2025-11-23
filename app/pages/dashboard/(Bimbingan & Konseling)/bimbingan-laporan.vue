<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Bimbingan & Konseling / Laporan");
</script>

<template>
  <Title>Bimbingan & Konseling | Laporan</Title>
  <LaporanContainer bidang="bimbingan_konseling" />
</template>
