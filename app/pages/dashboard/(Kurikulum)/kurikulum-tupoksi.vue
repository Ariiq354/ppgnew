<script setup lang="ts">
  import TupoksiKurikulumContainer from "~/features/tupoksi/TupoksiKurikulumContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kurikulum / Tupoksi");
</script>

<template>
  <Title>Kurikulum | Tupoksi</Title>
  <main>
    <TupoksiKurikulumContainer />
  </main>
</template>
