<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tenaga Pendidik / Laporan Bidang");
</script>

<template>
  <Title>Tenaga Pendidik | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="tenaga_pendidik" />
</template>
