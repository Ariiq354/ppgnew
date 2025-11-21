<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sarana Prasarana / Proker");
</script>

<template>
  <Title>Sarana Prasarana | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="sarana_prasarana" />
    </UCard>
  </main>
</template>
