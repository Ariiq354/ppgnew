<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kemandirian / Laporan Bidang");
</script>

<template>
  <Title>Kemandirian | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="kemandirian" />
</template>
