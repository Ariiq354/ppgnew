<script setup lang="ts">
  import PengurusMonitoringContainer from "~/features/pengurus/monitoring/PengurusMonitoringContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Monitoring Kehadiran");
</script>

<template>
  <Title>Sekretariat | Monitoring Kehadiran</Title>
  <PengurusMonitoringContainer />
</template>
