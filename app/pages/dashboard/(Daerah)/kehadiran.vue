<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kehadiran");

  const { data } = await useFetch(`${APIBASE}/home`);
</script>

<template>
  <Title>Kehadiran</Title>

  <main class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
    <PercentDetailCard :data="data!.data.percentPaud" />
    <PercentDetailCard :data="data!.data.percentCabeRawit" />
    <PercentDetailCard :data="data!.data.percentPraremaja" />
    <PercentDetailCard :data="data!.data.percentMudamudi" />
  </main>
</template>
