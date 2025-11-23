<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kemandirian / Laporan");
</script>

<template>
  <Title>Kemandirian | Laporan</Title>
  <LaporanContainer bidang="kemandirian" />
</template>
