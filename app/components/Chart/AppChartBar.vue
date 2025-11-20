<script lang="ts" setup>
  import { LegendPosition } from "#imports";

  type BarChartDatum = Record<string, string | number>;
  type BarChartProps = {
    title: string;
    data: BarChartDatum[];
    categories: string[];
  };

  const props = defineProps<BarChartProps>();

  const RevenueCategoriesMultple = {
    "Laki-laki": { name: "Laki-laki", color: "#3b82f6" },
    Perempuan: { name: "Perempuan", color: "#22c55e" },
  };

  const xFormatter = (i: number): string => `${props.data[i]?.name}`;
  const yFormatter = (tick: number) => tick.toString();
</script>

<template>
  <div class="flex flex-col gap-4 text-center">
    <p class="text-xl font-bold">{{ title }}</p>
    <ClientOnly>
      <template #fallback>
        <USkeleton class="h-[500px] w-full" />
      </template>
      <BarChart
        :data="data"
        :height="500"
        :categories="RevenueCategoriesMultple"
        :y-axis="categories"
        :group-padding="0"
        :bar-padding="0.1"
        :x-num-ticks="6"
        :radius="12"
        :x-formatter="xFormatter"
        :y-formatter="yFormatter"
        :legend-position="LegendPosition.TopRight"
        :hide-legend="false"
        :y-grid-line="true"
      />
    </ClientOnly>
  </div>
</template>
