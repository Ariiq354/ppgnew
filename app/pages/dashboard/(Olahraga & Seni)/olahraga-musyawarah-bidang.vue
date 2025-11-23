<script setup lang="ts">
  import MusyawarahBidangContainer from "~/features/musyawarah-bidang/musyawarah/MusyawarahBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Olahraga & Seni / Daftar Musyawarah Bidang");
</script>

<template>
  <Title>Olahraga & Seni | Daftar Musyawarah Bidang</Title>
  <main>
    <UCard>
      <MusyawarahBidangContainer bidang="olahraga_seni" />
    </UCard>
  </main>
</template>
