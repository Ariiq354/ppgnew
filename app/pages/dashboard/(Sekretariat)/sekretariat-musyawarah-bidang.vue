<script setup lang="ts">
  import MusyawarahBidangContainer from "~/features/musyawarah-bidang/musyawarah/MusyawarahBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Daftar Musyawarah Bidang");
</script>

<template>
  <Title>Sekretariat | Daftar Musyawarah Bidang</Title>
  <main>
    <UCard>
      <MusyawarahBidangContainer bidang="sekretariat" />
    </UCard>
  </main>
</template>
