<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Penggalang Dana / Proker");
</script>

<template>
  <Title>Penggalang Dana | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="penggalang_dana" />
    </UCard>
  </main>
</template>
