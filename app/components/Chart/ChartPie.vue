<script setup lang="ts">
  import {
    ArcElement,
    CategoryScale,
    Chart,
    Colors,
    Legend,
    LinearScale,
    Title,
    Tooltip,
  } from "chart.js";
  import { Pie } from "vue-chartjs";

  Chart.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
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
      <USkeleton class="aspect-1/1 w-full" />
    </template>
    <Pie
      id="my-chart-id"
      :data="{
        datasets,
        labels,
      }"
      :options="{
        plugins: {
          legend: {
            position: 'bottom',
            align: 'center',
            labels: {
              padding: 20,
            },
          },
        },
      }"
    />
  </ClientOnly>
</template>
