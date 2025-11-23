<script setup lang="ts">
  import TupoksiKegiatanContainer from "~/features/tupoksi/TupoksiKegiatanContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kegiatan Muda-Mudi / Tupoksi");
</script>

<template>
  <Title>Kegiatan Muda-Mudi | Tupoksi</Title>
  <main>
    <TupoksiKegiatanContainer />
  </main>
</template>
