<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kegiatan Muda-mudi / Dashboard");

  const { data } = await useFetch(`${APIBASE}/dashboard/mudamudi`);
</script>

<template>
  <Title>Kegiatan Muda-mudi | Dashbaord</Title>

  <main class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
    <PercentCard
      class="md:col-span-2"
      :percent="data!.data.percentMudamudi"
      title="Absensi"
      subtitle="Muda-mudi"
    />
    <PercentCard
      class="md:col-span-2"
      :percent="data!.data.percentUsiaMandiri"
      title="Absensi"
      subtitle="Usia Mandiri"
    />
    <NuxtLink class="md:col-span-4" to="/dashboard/kegiatan-generus">
      <CountCard
        title="Generus"
        :count="data!.data.countGenerus"
        icon="i-lucide-user"
      />
    </NuxtLink>
    <UCard class="md:col-span-3">
      <UnoChartBar
        title="Daftar Generus"
        :data="data!.data.generusDatasets"
        index="name"
        :categories="['Laki-laki', 'Perempuan']"
      />
    </UCard>
    <UCard>
      <UnoChartPie
        title="Daftar Generus By Grup"
        :data="data!.data.generusGroupDatasets"
        index="name"
        category="value"
      />
    </UCard>
  </main>
</template>
