<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Tahfidz / Dashboard");

  const { data } = await useFetch(`${APIBASE}/dashboard/tahfidz`);
</script>

<template>
  <Title>Tahfidz | Dashbaord</Title>

  <main class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
    <PercentCard
      class="md:col-span-2"
      :percent="data!.data.percentAbsensi"
      title="Absensi"
      subtitle="Tahfidz"
    />
    <NuxtLink class="md:col-span-2" to="/dashboard/tahfidz-generus">
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
