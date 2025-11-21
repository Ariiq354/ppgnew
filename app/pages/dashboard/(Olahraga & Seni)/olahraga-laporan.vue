<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Olahraga & Seni / Laporan");
</script>

<template>
  <Title>Olahraga & Seni | Laporan</Title>
  <LaporanContainer bidang="olahraga_seni" />
</template>
