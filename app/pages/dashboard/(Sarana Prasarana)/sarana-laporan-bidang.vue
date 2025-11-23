<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sarana Prasarana / Laporan Bidang");
</script>

<template>
  <Title>Sarana Prasarana | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="sarana_prasarana" />
</template>
