<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Olahraga & Seni / Proker");
</script>

<template>
  <Title>Olahraga & Seni | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="olahraga_seni" />
    </UCard>
  </main>
</template>
