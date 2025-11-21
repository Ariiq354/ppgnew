<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Proker");
</script>

<template>
  <Title>Sekretariat | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="sekretariat" />
    </UCard>
  </main>
</template>
