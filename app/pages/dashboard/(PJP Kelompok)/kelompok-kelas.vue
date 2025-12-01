<script setup lang="ts">
  import KelasKelompokContainer from "~/features/kelas/KelasKelompokContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Daftar Kelas");
</script>

<template>
  <Title>PJP Kelompok | Daftar Kelas</Title>
  <main>
    <UCard>
      <KelasKelompokContainer />
    </UCard>
  </main>
</template>
