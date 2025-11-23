<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sarana Prasarana / Laporan");
</script>

<template>
  <Title>Sarana Prasarana | Laporan</Title>
  <LaporanContainer bidang="sarana_prasarana" />
</template>
