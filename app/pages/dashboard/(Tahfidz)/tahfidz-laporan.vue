<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tahfidz / Laporan");
</script>

<template>
  <Title>Tahfidz | Laporan</Title>
  <LaporanContainer bidang="tahfidz" />
</template>
