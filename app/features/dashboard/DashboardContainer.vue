<script setup lang="ts">
  const { data } = await useFetch(`${APIBASE}/home`);
</script>

<template>
  <main class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
    <NuxtLink to="/dashboard/pengaturan-wilayah">
      <CountCard
        title="Desa"
        :count="data!.data.countDesa"
        icon="i-lucide-landmark"
      />
    </NuxtLink>
    <NuxtLink to="/dashboard/pengaturan-wilayah">
      <CountCard
        title="Kelompok"
        :count="data!.data.countKelompok"
        icon="i-lucide-layers"
      />
    </NuxtLink>
    <NuxtLink to="/dashboard/generus">
      <CountCard
        title="Generus"
        :count="data!.data.countGenerus"
        icon="i-lucide-user"
      />
    </NuxtLink>
    <NuxtLink to="/dashboard/pengajar">
      <CountCard
        title="Pengajar"
        :count="data!.data.countPengajar"
        icon="i-lucide-graduation-cap"
      />
    </NuxtLink>
    <PercentDetailCard :data="data!.data.percentPaud" />
    <PercentDetailCard :data="data!.data.percentCabeRawit" />
    <PercentDetailCard :data="data!.data.percentPraremaja" />
    <PercentDetailCard :data="data!.data.percentMudamudi" />
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
        subtitle="Pengajar"
        :data="data!.data.pengajarGroupDatasets"
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
