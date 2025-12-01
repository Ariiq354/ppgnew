<script setup lang="ts">
  import PengusahaContainer from "~/features/pengusaha/PengusahaContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kemandirian / Pengusaha");
</script>

<template>
  <Title>Kemandirian | Pengusaha</Title>
  <main>
    <UCard>
      <PengusahaContainer />
    </UCard>
  </main>
</template>
