<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Laporan Bidang");
</script>

<template>
  <Title>Sekretariat | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="sekretariat" />
</template>
