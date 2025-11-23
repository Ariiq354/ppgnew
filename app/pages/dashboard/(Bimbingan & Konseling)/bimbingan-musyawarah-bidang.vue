<script setup lang="ts">
  import MusyawarahBidangContainer from "~/features/musyawarah-bidang/musyawarah/MusyawarahBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Bimbingan & Konseling / Daftar Musyawarah Bidang");
</script>

<template>
  <Title>Bimbingan & Konseling | Daftar Musyawarah Bidang</Title>
  <main>
    <UCard>
      <MusyawarahBidangContainer bidang="bimbingan_konseling" />
    </UCard>
  </main>
</template>
