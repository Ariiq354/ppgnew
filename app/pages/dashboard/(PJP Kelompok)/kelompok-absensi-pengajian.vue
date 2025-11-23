<script setup lang="ts">
  import AbsensiJamaahContainer from "~/features/pengajian/absensi/AbsensiJamaahContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Absensi Jamaah");
</script>

<template>
  <Title>PJP Kelompok | Absensi Jamaah</Title>
  <AbsensiJamaahContainer />
</template>
