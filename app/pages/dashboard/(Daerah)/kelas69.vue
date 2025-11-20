<script setup lang="ts">
  import Kelas69Container from "~/features/dashboard/Kelas69Container.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Data Kelas 6 & 9");
</script>

<template>
  <Title>Dashboard | Data Kelas 6 & 9</Title>
  <Kelas69Container />
</template>
