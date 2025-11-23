<script setup lang="ts">
  import MusyawarahBidangContainer from "~/features/musyawarah-bidang/musyawarah/MusyawarahBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sarana Prasarana / Daftar Musyawarah Bidang");
</script>

<template>
  <Title>Sarana Prasarana | Daftar Musyawarah Bidang</Title>
  <main>
    <UCard>
      <MusyawarahBidangContainer bidang="sarana_prasarana" />
    </UCard>
  </main>
</template>
