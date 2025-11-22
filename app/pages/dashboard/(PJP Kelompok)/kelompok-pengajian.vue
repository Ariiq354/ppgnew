<script setup lang="ts">
  import PengajianContainer from "~/features/pengajian/PengajianContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Daftar Pengajian");
</script>

<template>
  <Title>PJP Kelompok | Daftar Pengajian</Title>
  <main>
    <UCard>
      <PengajianContainer />
    </UCard>
  </main>
</template>
