<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Bimbingan & Konseling / Proker");
</script>

<template>
  <Title>Bimbingan & Konseling | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="bimbingan_konseling" />
    </UCard>
  </main>
</template>
