<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kegiatan Muda-mudi / Proker");
</script>

<template>
  <Title>Kegiatan Muda-mudi | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="kegiatan_muda_mudi" />
    </UCard>
  </main>
</template>
