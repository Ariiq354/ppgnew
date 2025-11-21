<script setup lang="ts">
  import MusyawarahBidangContainer from "~/features/musyawarah-bidang/musyawarah/MusyawarahBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Penggalang Dana / Daftar Musyawarah Bidang");
</script>

<template>
  <Title>Penggalang Dana | Daftar Musyawarah Bidang</Title>
  <main>
    <UCard>
      <MusyawarahBidangContainer bidang="penggalang_dana" />
    </UCard>
  </main>
</template>
