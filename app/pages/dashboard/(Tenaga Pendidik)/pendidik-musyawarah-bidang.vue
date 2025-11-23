<script setup lang="ts">
  import MusyawarahBidangContainer from "~/features/musyawarah-bidang/musyawarah/MusyawarahBidangContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tenaga Pendidik / Daftar Musyawarah Bidang");
</script>

<template>
  <Title>Tenaga Pendidik | Daftar Musyawarah Bidang</Title>
  <main>
    <UCard>
      <MusyawarahBidangContainer bidang="tenaga_pendidik" />
    </UCard>
  </main>
</template>
