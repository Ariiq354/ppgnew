<script setup lang="ts">
  import TupoksiTahfidzContainer from "~/features/tupoksi/TupoksiTahfidzContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tahfidz / Tupoksi");
</script>

<template>
  <Title>Tahfidz | Tupoksi</Title>
  <main>
    <TupoksiTahfidzContainer />
  </main>
</template>
