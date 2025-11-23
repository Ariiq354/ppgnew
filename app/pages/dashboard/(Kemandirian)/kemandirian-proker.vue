<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kemandirian / Proker");
</script>

<template>
  <Title>Kemandirian | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="kemandirian" />
    </UCard>
  </main>
</template>
