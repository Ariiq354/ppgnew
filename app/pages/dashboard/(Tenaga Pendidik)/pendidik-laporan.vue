<script setup lang="ts">
  import LaporanContainer from "~/features/musyawarah/laporan/LaporanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tenaga Pendidik / Laporan");
</script>

<template>
  <Title>Tenaga Pendidik | Laporan</Title>
  <LaporanContainer bidang="tenaga_pendidik" />
</template>
