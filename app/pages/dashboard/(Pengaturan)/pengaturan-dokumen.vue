<script setup lang="ts">
  import DokumenContainer from "~/features/pengaturan/dokumen/DokumenContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Pengaturan / Dokumen");
</script>

<template>
  <Title>Pengaturan | Dokumen</Title>
  <main>
    <DokumenContainer />
  </main>
</template>
