<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Home Dashboard");

  const { data } = await useFetch(`${APIBASE}/home`);

  const testData = [
    {
      name: "PAUD",
      "Laki-laki": Math.floor(Math.random() * 2000) + 500,
      Perempuan: Math.floor(Math.random() * 2000) + 500,
    },
    {
      name: "Cabe Rawit",
      "Laki-laki": Math.floor(Math.random() * 2000) + 500,
      Perempuan: Math.floor(Math.random() * 2000) + 500,
    },
    {
      name: "Remaja",
      "Laki-laki": Math.floor(Math.random() * 2000) + 500,
      Perempuan: Math.floor(Math.random() * 2000) + 500,
    },
    {
      name: "Praremaja",
      "Laki-laki": Math.floor(Math.random() * 2000) + 500,
      Perempuan: Math.floor(Math.random() * 2000) + 500,
    },
    {
      name: "Pranikah",
      "Laki-laki": Math.floor(Math.random() * 2000) + 500,
      Perempuan: Math.floor(Math.random() * 2000) + 500,
    },
    {
      name: "Usia Mandiri",
      "Laki-laki": Math.floor(Math.random() * 2000) + 500,
      Perempuan: Math.floor(Math.random() * 2000) + 500,
    },
  ];
</script>

<template>
  <Title>Home</Title>

  <main class="grid grid-cols-1 gap-8 md:grid-cols-4">
    <NuxtLink to="/dashboard/pengaturan-wilayah">
      <UCard>
        <div class="flex items-center gap-4">
          <UIcon name="i-lucide-landmark" size="100" />
          <div
            class="flex w-full flex-col items-end justify-center gap-2 text-right"
          >
            <p class="text-2xl font-bold">{{ data?.data.countDesa }}</p>
            <p class="text-lg">Desa</p>
          </div>
        </div>
      </UCard>
    </NuxtLink>
    <NuxtLink to="/dashboard/pengaturan-wilayah">
      <UCard>
        <div class="flex items-center gap-4">
          <UIcon name="i-lucide-layers" size="100" />
          <div
            class="flex w-full flex-col items-end justify-center gap-2 text-right"
          >
            <p class="text-2xl font-bold">{{ data?.data.countKelompok }}</p>
            <p class="text-lg">Kelompok</p>
          </div>
        </div>
      </UCard>
    </NuxtLink>
    <NuxtLink to="/dashboard/generus">
      <UCard>
        <div class="flex items-center gap-4">
          <UIcon name="i-lucide-user" size="100" />
          <div
            class="flex w-full flex-col items-end justify-center gap-2 text-right"
          >
            <p class="text-2xl font-bold">{{ data?.data.countGenerus }}</p>
            <p class="text-lg">Generus</p>
          </div>
        </div>
      </UCard>
    </NuxtLink>
    <NuxtLink to="/dashboard/pengajar">
      <UCard>
        <div class="flex items-center gap-4">
          <UIcon name="i-lucide-graduation-cap" size="100" />
          <div
            class="flex w-full flex-col items-end justify-center gap-2 text-right"
          >
            <p class="text-2xl font-bold">{{ data?.data.countPengajar }}</p>
            <p class="text-lg">Pengajar</p>
          </div>
        </div>
      </UCard>
    </NuxtLink>
    <UCard class="md:col-span-3">
      <div class="flex flex-col gap-4 text-center">
        <p class="text-xl font-bold">Daftar Generus</p>
        <UnoChartBar
          :data="testData"
          index="name"
          :categories="['Laki-laki', 'Perempuan']"
        />
      </div>
    </UCard>
    <UCard>
      <div class="flex flex-col gap-12 text-center">
        <p class="text-xl font-bold">Daftar Generus By Grup</p>
        <UnoChartPie :data="testData" index="name" category="Perempuan" />
      </div>
    </UCard>
    <UCard>
      <div class="flex flex-col gap-12 text-center">
        <p class="text-xl font-bold">Daftar Pengajar By Grup</p>
        <UnoChartPie :data="testData" index="name" category="Perempuan" />
      </div>
    </UCard>
    <UCard class="md:col-span-3">
      <div class="flex flex-col gap-4 text-center">
        <p class="text-xl font-bold">Daftar Pengajar</p>
        <UnoChartBar
          :data="testData"
          index="name"
          :categories="['Laki-laki', 'Perempuan']"
        />
      </div>
    </UCard>
  </main>
</template>
