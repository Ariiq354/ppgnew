<script setup lang="ts">
  import DashboardContainer from "~/features/dashboard/DashboardContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Home Dashboard");
</script>

<template>
  <Title>Home Dashboard</Title>

  <DashboardContainer />
</template>
