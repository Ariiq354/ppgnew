<script setup lang="ts">
  import TupoksiDesaContainer from "~/features/tupoksi/TupoksiDesaContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Desa / Tupoksi");
</script>

<template>
  <Title>PJP Desa | Tupoksi</Title>
  <main>
    <TupoksiDesaContainer />
  </main>
</template>
