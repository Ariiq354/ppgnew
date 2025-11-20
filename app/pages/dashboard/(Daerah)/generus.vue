<script setup lang="ts">
  import GenerusContainer from "~/features/generus/GenerusContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Generus");
</script>

<template>
  <Title>Dashboard | Generus</Title>
  <main>
    <UCard>
      <GenerusContainer />
    </UCard>
  </main>
</template>
