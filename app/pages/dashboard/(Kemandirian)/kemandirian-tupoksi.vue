<script setup lang="ts">
  import TupoksiKemandirianContainer from "~/features/tupoksi/TupoksiKemandirianContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kemandirian / Tupoksi");
</script>

<template>
  <Title>Kemandirian | Tupoksi</Title>
  <main>
    <TupoksiKemandirianContainer />
  </main>
</template>
