<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kurikulum / Laporan Bidang");
</script>

<template>
  <Title>Kurikulum | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="kurikulum" />
</template>
