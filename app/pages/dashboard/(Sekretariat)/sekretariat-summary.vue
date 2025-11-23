<script setup lang="ts">
  import LaporanSummaryContainer from "~/features/musyawarah/laporan/LaporanSummaryContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Summary");
</script>

<template>
  <Title>Sekretariat | Summary</Title>
  <LaporanSummaryContainer />
</template>
