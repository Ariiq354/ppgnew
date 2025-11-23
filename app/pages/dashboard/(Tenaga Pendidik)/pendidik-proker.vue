<script setup lang="ts">
  import ProkerBidangContainer from "~/features/proker/ProkerBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tenaga Pendidik / Proker");
</script>

<template>
  <Title>Tenaga Pendidik | Proker</Title>
  <main>
    <UCard>
      <ProkerBidangContainer bidang="tenaga_pendidik" />
    </UCard>
  </main>
</template>
