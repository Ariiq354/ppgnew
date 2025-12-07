<script setup lang="ts">
  import type { kelasGenerusEnum } from "~~/shared/enum";

  interface KelompokDetail {
    namaKelompok: string;
    totalPercent: number;
  }

  defineProps<{
    data: {
      nama: (typeof kelasGenerusEnum)[number];
      totalPercentAll: number;
      kelompok: KelompokDetail[];
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
          Absensi Desa
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
      <div v-for="(item, index) in data.kelompok" :key="index">
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-left">
              <p class="text-base font-semibold text-gray-900 dark:text-white">
                Desa {{ item.namaKelompok }}
              </p>
            </div>
          </div>

          <div class="text-secondary rounded-full px-3 py-1 font-bold">
            {{ Math.round(item.totalPercent) }}%
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
