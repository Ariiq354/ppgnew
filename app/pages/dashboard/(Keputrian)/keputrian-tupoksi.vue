<script setup lang="ts">
  import TupoksiKeputrianContainer from "~/features/tupoksi/TupoksiKeputrianContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Keputrian / Tupoksi");
</script>

<template>
  <Title>Keputrian | Tupoksi</Title>
  <main>
    <TupoksiKeputrianContainer />
  </main>
</template>
