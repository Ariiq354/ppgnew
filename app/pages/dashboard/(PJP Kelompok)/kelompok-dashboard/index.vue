<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Dashboard");

  const { data } = await useFetch(`${APIBASE}/dashboard/kelompok`);
</script>

<template>
  <Title>PJP Kelompok | Dashbaord</Title>

  <main class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
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
    <NuxtLink class="md:col-span-2" to="/dashboard/kelompok-generus">
      <CountCard
        title="Generus"
        :count="data!.data.countGenerus"
        icon="i-lucide-user"
      />
    </NuxtLink>
    <NuxtLink class="md:col-span-2" to="/dashboard/kelompok-pengajar">
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
        subtitle="pengajar"
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
