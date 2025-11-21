<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Bimbingan & Konseling / Laporan Bidang");
</script>

<template>
  <Title>Bimbingan & Konseling | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="bimbingan_konseling" />
</template>
