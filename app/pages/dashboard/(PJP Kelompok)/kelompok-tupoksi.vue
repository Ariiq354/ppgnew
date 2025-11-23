<script setup lang="ts">
  import TupoksiKelompokContainer from "~/features/tupoksi/TupoksiKelompokContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Tupoksi");
</script>

<template>
  <Title>PJP Kelompok | Tupoksi</Title>
  <main>
    <TupoksiKelompokContainer />
  </main>
</template>
