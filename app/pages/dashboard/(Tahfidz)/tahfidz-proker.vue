<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tahfidz / Proker");
</script>

<template>
  <Title>Tahfidz | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="tahfidz" />
    </UCard>
  </main>
</template>
