<script setup lang="ts">
  import TupoksiTahfidzContainer from "~/features/tupoksi/TupoksiTahfidzContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tenaga Pendidik / Tupoksi");
</script>

<template>
  <Title>Tenaga Pendidik | Tupoksi</Title>
  <main>
    <TupoksiTahfidzContainer />
  </main>
</template>
