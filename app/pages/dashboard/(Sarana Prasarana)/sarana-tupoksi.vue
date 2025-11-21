<script setup lang="ts">
  import TupoksiSaranaContainer from "~/features/tupoksi/TupoksiSaranaContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sarana & Prasarana / Tupoksi");
</script>

<template>
  <Title>Sarana & Prasarana | Tupoksi</Title>
  <main>
    <TupoksiSaranaContainer />
  </main>
</template>
