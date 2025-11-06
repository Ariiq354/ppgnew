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
