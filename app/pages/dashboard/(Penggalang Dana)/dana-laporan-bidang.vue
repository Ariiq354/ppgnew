<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Penggalang Dana / Laporan Bidang");
</script>

<template>
  <Title>Penggalang Dana | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="penggalang_dana" />
</template>
