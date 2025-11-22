<script setup lang="ts">
  import PengurusContainer from "~/features/pengurus/pengurus/PengurusContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Pengurus");
</script>

<template>
  <Title>Sekretariat | Pengurus</Title>

  <main>
    <UCard>
      <PengurusContainer />
    </UCard>
  </main>
</template>
