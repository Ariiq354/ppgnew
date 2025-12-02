<script setup lang="ts">
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
