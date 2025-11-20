<script setup lang="ts">
  import ProkerContainer from "~/features/proker/ProkerContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Program Kerja");
</script>

<template>
  <Title>Dashboard | Program Kerja</Title>
  <main>
    <UCard>
      <ProkerContainer />
    </UCard>
  </main>
</template>
