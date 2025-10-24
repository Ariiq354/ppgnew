<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Dashboard");

  const { data } = await useFetch(`${APIBASE}/dashboard/kelompok`);
</script>

<template>
  <Title>PJP Kelompok | Dashbaord</Title>

  <main class="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-8">
    <PercentCard
      :percent="data!.data.percentPaud"
      title="Absensi"
      subtitle="PAUD"
    />
    <PercentCard
      :percent="data!.data.percentCabeRawit"
      title="Absensi"
      subtitle="Cabe Rawit"
    />
    <PercentCard
      :percent="data!.data.percentPraremaja"
      title="Absensi"
      subtitle="Praremaja"
    />
    <PercentCard
      :percent="data!.data.percentMudamudi"
      title="Absensi"
      subtitle="Muda-mudi"
    />
    <NuxtLink class="sm:col-span-2" to="/dashboard/kelompok-generus">
      <CountCard
        title="Generus"
        :count="data!.data.countGenerus"
        icon="i-lucide-user"
      />
    </NuxtLink>
    <NuxtLink class="sm:col-span-2" to="/dashboard/kelompok-pengajar">
      <CountCard
        title="Pengajar"
        :count="data!.data.countPengajar"
        icon="i-lucide-graduation-cap"
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
    <UCard>
      <UnoChartPie
        title="Daftar Pengajar By Grup"
        :data="data!.data.pengajarGroupDatasets"
        index="name"
        category="value"
      />
    </UCard>
    <UCard class="md:col-span-3">
      <UnoChartBar
        title="Daftar Pengajar"
        :data="data!.data.pengajarDatasets"
        index="name"
        :categories="['Laki-laki', 'Perempuan']"
      />
    </UCard>
  </main>
</template>
