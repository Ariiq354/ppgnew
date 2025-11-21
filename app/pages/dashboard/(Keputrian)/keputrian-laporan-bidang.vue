<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Keputrian / Laporan Bidang");
</script>

<template>
  <Title>Keputrian | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="keputrian" />
</template>
