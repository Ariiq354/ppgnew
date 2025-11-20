<script setup lang="ts">
  import PengajarContainer from "~/features/daerah/pengajar/PengajarContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Tenaga Pengajar");
</script>

<template>
  <Title>Dashboard | Tenaga Pengajar</Title>
  <main>
    <UCard>
      <PengajarContainer />
    </UCard>
  </main>
</template>
