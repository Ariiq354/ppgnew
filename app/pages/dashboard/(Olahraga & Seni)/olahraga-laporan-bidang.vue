<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Olahraga & Seni / Laporan Bidang");
</script>

<template>
  <Title>Olahraga & Seni | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="olahraga_seni" />
</template>
