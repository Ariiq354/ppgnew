<script setup lang="ts">
  const constantStore = useConstantStore();
  onMounted(() => {
    constantStore.setTitle("Home Dashboard");
  });

  const GENERUS_LABELS = [
    "PAUD",
    "Cabe Rawit",
    "Praremaja",
    "Remaja",
    "Pranikah",
    "Usia Mandiri",
  ];

  const PENGAJAR_LABELS = [
    "Mubalig Tugasan",
    "Mubalig Setempat",
    "Asisten Pengajar",
  ];

  const { data } = await useFetch(`${APIBASE}/home`);
</script>

<template>
  <Title>Home</Title>

  <main class="grid grid-cols-1 gap-8 md:grid-cols-4">
    <UCard>
      <div class="flex items-center gap-4">
        <UIcon name="i-heroicons-building-office-2" size="100" />
        <div
          class="flex w-full flex-col items-end justify-center gap-2 text-right"
        >
          <p class="text-2xl font-bold">{{ 78 }}</p>
          <p class="text-lg">Desa</p>
        </div>
      </div>
    </UCard>
    <UCard>
      <div class="flex items-center gap-4">
        <UIcon name="i-heroicons-map-pin" size="100" />
        <div
          class="flex w-full flex-col items-end justify-center gap-2 text-right"
        >
          <p class="text-2xl font-bold">{{ 34 }}</p>
          <p class="text-lg">Kelompok</p>
        </div>
      </div>
    </UCard>
    <NuxtLink to="/dashboard/generus">
      <UCard>
        <div class="flex items-center gap-4">
          <UIcon name="i-heroicons-user-20-solid" size="100" />
          <div
            class="flex w-full flex-col items-end justify-center gap-2 text-right"
          >
            <p class="text-2xl font-bold">{{ 45 }}</p>
            <p class="text-lg">Generus</p>
          </div>
        </div>
      </UCard>
    </NuxtLink>
    <NuxtLink to="/dashboard/pengajar">
      <UCard>
        <div class="flex items-center gap-4">
          <UIcon name="i-heroicons-user-group-20-solid" size="100" />
          <div
            class="flex w-full flex-col items-end justify-center gap-2 text-right"
          >
            <p class="text-2xl font-bold">{{ 98 }}</p>
            <p class="text-lg">Pengajar</p>
          </div>
        </div>
      </UCard>
    </NuxtLink>
    <UCard class="md:col-span-3">
      <div class="flex flex-col gap-4 text-center">
        <p class="text-xl font-bold">Daftar Generus</p>
        <ChartBar
          :labels="GENERUS_LABELS"
          :datasets="data?.data.generusDatasets"
        />
      </div>
    </UCard>
    <UCard>
      <div class="flex flex-col gap-12 text-center">
        <p class="text-xl font-bold">Daftar Generus By Grup</p>
        <ChartPie
          :labels="GENERUS_LABELS"
          :datasets="data?.data.generusGroupDatasets"
        />
      </div>
    </UCard>
    <UCard>
      <div class="flex flex-col gap-12 text-center">
        <p class="text-xl font-bold">Daftar Pengajar By Grup</p>
        <ChartPie
          :labels="PENGAJAR_LABELS"
          :datasets="data?.data.pengajarGroupDatasets"
        />
      </div>
    </UCard>
    <UCard class="md:col-span-3">
      <div class="flex flex-col gap-4 text-center">
        <p class="text-xl font-bold">Daftar Pengajar</p>
        <ChartBar
          :labels="PENGAJAR_LABELS"
          :datasets="data?.data.pengajarDatasets"
        />
      </div>
    </UCard>
  </main>
</template>
