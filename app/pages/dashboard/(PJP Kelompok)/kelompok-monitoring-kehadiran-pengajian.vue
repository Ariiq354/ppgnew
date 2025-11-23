<script setup lang="ts">
  import JamaahMonitoringContainer from "~/features/pengajian/monitoring/JamaahMonitoringContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Monitoring Kehadiran Pengajian");
</script>

<template>
  <Title>PJP Kelompok | Monitoring Kehadiran Pengajian</Title>
  <JamaahMonitoringContainer />
</template>
