<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Keputrian / Proker");
</script>

<template>
  <Title>Keputrian | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="keputrian" />
    </UCard>
  </main>
</template>
