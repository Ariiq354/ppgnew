<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Desa / Dashboard");

  const { data } = await useFetch(`${APIBASE}/dashboard/desa`);
</script>

<template>
  <Title>PJP Desa | Dashbaord</Title>

  <main class="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-8">
    <PercentDetailDesaCard :data="data!.data.percentPaud" />
    <PercentDetailDesaCard :data="data!.data.percentCabeRawit" />
    <PercentDetailDesaCard :data="data!.data.percentPraremaja" />
    <PercentDetailDesaCard :data="data!.data.percentMudamudi" />
    <NuxtLink class="md:col-span-2" to="/dashboard/desa-generus">
      <CountCard
        title="Generus"
        :count="data!.data.countGenerus"
        icon="i-lucide-user"
      />
    </NuxtLink>
    <NuxtLink class="md:col-span-2" to="/dashboard/desa-pengajar">
      <CountCard
        title="Pengajar"
        :count="data!.data.countPengajar"
        icon="i-lucide-graduation-cap"
      />
    </NuxtLink>
    <UCard class="md:col-span-3">
      <AppChartBar
        title="Daftar Generus"
        :data="data!.data.generusDatasets"
        :categories="['Laki-laki', 'Perempuan']"
      />
    </UCard>
    <UCard>
      <AppChartPie
        title="Daftar Generus By Grup"
        :data="data!.data.generusGroupDatasets"
        subtitle="generus"
      />
    </UCard>
    <UCard>
      <AppChartPie
        title="Daftar Pengajar By Grup"
        :data="data!.data.pengajarGroupDatasets"
        subtitle="pegnajar"
      />
    </UCard>
    <UCard class="md:col-span-3">
      <AppChartBar
        title="Daftar Pengajar"
        :data="data!.data.pengajarDatasets"
        :categories="['Laki-laki', 'Perempuan']"
      />
    </UCard>
  </main>
</template>
