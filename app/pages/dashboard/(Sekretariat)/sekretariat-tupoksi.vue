<script setup lang="ts">
  import TupoksiSekretariatContainer from "~/features/tupoksi/TupoksiSekretariatContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Tupoksi");
</script>

<template>
  <Title>Sekretariat | Tupoksi</Title>
  <main>
    <TupoksiSekretariatContainer />
  </main>
</template>
