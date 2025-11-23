<script setup lang="ts">
  import PengajarDesaContainer from "~/features/pengajar/PengajarDesaContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Desa / Pengajar");
</script>

<template>
  <Title>PJP Desa | Pengajar</Title>
  <main>
    <UCard>
      <PengajarDesaContainer />
    </UCard>
  </main>
</template>
