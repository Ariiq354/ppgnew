<script setup lang="ts">
  import {
    VisSingleContainer,
    VisDonut,
    VisTooltip,
    VisBulletLegend,
  } from "@unovis/vue";
  import { Donut } from "@unovis/ts";

  type ChartDatum = Record<string, string | number>;
  type ChartProps = {
    data: ChartDatum[];
    index: string;
    category: string;
  };

  const props = defineProps<ChartProps>();

  const data = props.data.map((i) => i[props.category]);
  const value = (d: number) => d;

  const count = props.data.reduce(
    (a, i) => (a += Number(i[props.category])),
    0
  );

  const triggers = {
    [Donut.selectors.segment]: (d: any) => {
      const label = String(props.data[d.index]![props.index]);
      const value = props.data[d.index]![props.category];

      return `
        <div class="p-3 text-left border-gray-200">${label} ${value}</div>
      `;
    },
  };

  const items = props.data.map((i) => ({
    name: String(i[props.index]),
  }));
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <USkeleton class="aspect-1/1 w-full" />
    </template>
    <VisSingleContainer :data>
      <VisDonut
        :value
        :central-label="count"
        central-sub-label="Generus"
        :arc-width="60"
      />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
    <VisBulletLegend :items="items" />
  </ClientOnly>
</template>
