<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Keputrian / Laporan");
</script>

<template>
  <Title>Keputrian | Laporan</Title>
  <LaporanContainer bidang="keputrian" />
</template>
