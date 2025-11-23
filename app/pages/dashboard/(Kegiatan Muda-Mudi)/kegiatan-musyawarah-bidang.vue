<script setup lang="ts">
  import MusyawarahBidangContainer from "~/features/musyawarah-bidang/musyawarah/MusyawarahBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kegiatan Muda-mudi / Daftar Musyawarah Bidang");
</script>

<template>
  <Title>Kegiatan Muda-mudi | Daftar Musyawarah Bidang</Title>
  <main>
    <UCard>
      <MusyawarahBidangContainer bidang="kegiatan_muda_mudi" />
    </UCard>
  </main>
</template>
