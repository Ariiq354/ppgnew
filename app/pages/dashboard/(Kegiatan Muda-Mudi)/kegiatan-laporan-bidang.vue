<script setup lang="ts">
  import LaporanBidangContainer from "~/features/musyawarah-bidang/laporan/LaporanBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kegiatan Muda-mudi / Laporan Bidang");
</script>

<template>
  <Title>Kegiatan Muda-mudi | Laporan Bidang</Title>
  <LaporanBidangContainer bidang="kegiatan_muda_mudi" />
</template>
