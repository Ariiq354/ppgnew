<script setup lang="ts">
  import AbsensiPengurusContainer from "~/features/pengurus/absensi/AbsensiPengurusContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Absensi");
</script>

<template>
  <Title>Sekretariat | Absensi</Title>
  <AbsensiPengurusContainer />
</template>
