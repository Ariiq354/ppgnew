<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Laporan");
</script>

<template>
  <Title>Sekretariat | Laporan</Title>
  <LaporanContainer bidang="sekretariat" />
</template>
