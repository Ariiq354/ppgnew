<script setup lang="ts">
  import PengajarKelompokContainer from "~/features/pengajar/PengajarKelompokContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Pengajar");
</script>

<template>
  <Title>PJP Kelompok | Pengajar</Title>
  <main>
    <UCard>
      <PengajarKelompokContainer />
    </UCard>
  </main>
</template>
