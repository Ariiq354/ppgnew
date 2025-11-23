<script setup lang="ts">
  import TupoksiBimbinganContainer from "~/features/tupoksi/TupoksiBimbinganContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Bimbingan & Konseling / Tupoksi");
</script>

<template>
  <Title>Bimbingan & Konseling | Tupoksi</Title>
  <main>
    <TupoksiBimbinganContainer />
  </main>
</template>
