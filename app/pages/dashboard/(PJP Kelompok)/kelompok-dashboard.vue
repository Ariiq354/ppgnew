<script setup lang="ts">
  import DashboardKelompokContainer from "~/features/dashboard/DashboardKelompokContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Dashboard");
</script>

<template>
  <Title>PJP Kelompok | Dashbaord</Title>

  <DashboardKelompokContainer />
</template>
