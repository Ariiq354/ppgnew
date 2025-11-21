<script setup lang="ts">
  import TupoksiOlahragaContainer from "~/features/tupoksi/TupoksiOlahragaContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Olahraga & Seni / Tupoksi");
</script>

<template>
  <Title>Olahraga & Seni | Tupoksi</Title>
  <main>
    <TupoksiOlahragaContainer />
  </main>
</template>
