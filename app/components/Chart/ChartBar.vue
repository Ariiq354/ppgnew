<script setup lang="ts">
  import { Bar } from "vue-chartjs";
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    Colors,
  } from "chart.js";

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    Colors
  );

  const { labels = [], datasets = [] } = defineProps<{
    labels?: string[];
    datasets?: {
      label: string;
      data: number[];
      borderWidth?: number;
    }[];
  }>();
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <USkeleton class="aspect-2/1 w-full" />
    </template>
    <Bar
      id="my-chart-id"
      :data="{
        datasets,
        labels,
      }"
      :options="{
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      }"
    />
  </ClientOnly>
</template>
