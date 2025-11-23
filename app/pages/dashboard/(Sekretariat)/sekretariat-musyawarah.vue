<script setup lang="ts">
  import MusyawarahContainer from "~/features/musyawarah/musyawarah/MusyawarahContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Daftar Musyawarah");
</script>

<template>
  <Title>Sekretariat | Daftar Musyawarah</Title>
  <main>
    <UCard>
      <MusyawarahContainer />
    </UCard>
  </main>
</template>
