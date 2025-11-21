<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tahfidz / Laporan Bidang");
</script>

<template>
  <Title>Tahfidz | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="tahfidz" />
</template>
