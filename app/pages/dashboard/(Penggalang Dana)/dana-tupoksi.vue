<script setup lang="ts">
  import TupoksiDanaContainer from "~/features/tupoksi/TupoksiDanaContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Penggalang Dana / Tupoksi");
</script>

<template>
  <Title>Penggalang Dana | Tupoksi</Title>
  <main>
    <TupoksiDanaContainer />
  </main>
</template>
