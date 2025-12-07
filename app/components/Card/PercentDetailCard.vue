<script setup lang="ts">
  import type { kelasGenerusEnum } from "~~/shared/enum";

  interface KelompokDetail {
    namaKelompok: string;
    totalPercent: number;
  }

  interface DesaDetail {
    namaDesa: string;
    totalPercentDesa: number;
    kelompok: KelompokDetail[];
  }

  defineProps<{
    data: {
      desa: DesaDetail[];
      nama: (typeof kelasGenerusEnum)[number];
      totalPercentAll: number;
    };
  }>();
</script>

<template>
  <UCard>
    <div class="mb-2 flex items-center justify-between">
      <div>
        <p
          class="text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400"
        >
          Absensi Daerah
        </p>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ data.nama }}
        </h2>
      </div>
      <div class="text-right">
        <p class="text-primary text-3xl font-bold">
          {{ Math.round(data.totalPercentAll) }}%
        </p>
      </div>
    </div>
    <div
      class="mt-2 mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"
    >
      <div
        class="bg-primary h-2.5 rounded-full transition-all duration-500"
        :style="{ width: `${data.totalPercentAll}%` }"
      ></div>
    </div>
    <div class="border-muted mt-2 flex flex-col gap-4 rounded-xl border p-4">
      <div v-for="(item, index) in data.desa" :key="index">
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-left">
              <p class="text-base font-semibold text-gray-900 dark:text-white">
                {{ item.namaDesa }}
              </p>
              <p class="text-xs font-normal text-gray-500">
                {{ item.kelompok.length }} Kelompok
              </p>
            </div>
          </div>

          <div class="text-secondary rounded-full px-3 py-1 font-bold">
            {{ Math.round(item.totalPercentDesa) }}%
          </div>
        </div>
        <div
          class="border-muted my-2 rounded-xl border bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/50"
        >
          <ul class="space-y-3">
            <li
              v-for="(child, kIndex) in item.kelompok"
              :key="kIndex"
              class="group flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <span
                  class="text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  {{ child.namaKelompok }}
                </span>
              </div>
              <span class="text-success text-sm font-bold">
                {{ child.totalPercent }}%
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </UCard>
</template>
