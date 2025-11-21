<script setup lang="ts">
  import MusyawarahBidangContainer from "~/features/musyawarah-bidang/musyawarah/MusyawarahBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kemandirian / Daftar Musyawarah Bidang");
</script>

<template>
  <Title>Kemandirian | Daftar Musyawarah Bidang</Title>
  <main>
    <UCard>
      <MusyawarahBidangContainer bidang="kemandirian" />
    </UCard>
  </main>
</template>
