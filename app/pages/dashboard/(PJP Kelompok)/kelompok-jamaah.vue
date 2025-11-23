<script setup lang="ts">
  import JamaahContainer from "~/features/pengajian/jamaah/JamaahContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Jamaah");
</script>

<template>
  <Title>PJP Kelompok | Jamaah</Title>

  <main>
    <UCard>
      <JamaahContainer />
    </UCard>
  </main>
</template>
