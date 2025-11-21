<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kurikulum / Proker");
</script>

<template>
  <Title>Kurikulum | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="kurikulum" />
    </UCard>
  </main>
</template>
