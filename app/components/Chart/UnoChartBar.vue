<script setup lang="ts">
  import { GroupedBar } from "@unovis/ts";
  import {
    VisAxis,
    VisBulletLegend,
    VisGroupedBar,
    VisTooltip,
    VisXYContainer,
  } from "@unovis/vue";

  type BarChartDatum = Record<string, string | number>;
  type BarChartProps = {
    data: BarChartDatum[];
    index: string;
    categories: string[];
  };

  const props = defineProps<BarChartProps>();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const x = (_: BarChartDatum, i: number) => i;
  const tickFormat = (tick: number) => props.data[tick]![props.index];
  const y = props.categories.map((cat) => (d: BarChartDatum) => d[cat]);

  const items = props.categories.map((i) => ({
    name: i,
  }));

  const triggers = {
    [GroupedBar.selectors.bar]: (d: BarChartDatum) => {
      const label = String(d[props.index]);
      const rows = props.categories
        .map((c) => {
          const val = d[c];
          return `
              <div class="flex justify-between">
                <span>${c}</span>
                <span class="font-semibold ml-4">${val}</span>
              </div>
            `;
        })
        .join("");

      return `
        <div class="p-3 border-b text-left border-gray-200">${label}</div>
        <div class="p-3 min-2-[180px] flex flex-col gap-1">${rows}</div>
      `;
    },
  };
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <USkeleton class="h-[500px] w-full" />
    </template>
    <VisBulletLegend :items="items" />
    <VisXYContainer v-if="isDesktop" :data="data" :height="500">
      <VisGroupedBar :x="x" :y="y" :rounded-corners="10" :bar-padding="0.02" />
      <VisTooltip :triggers="triggers" />
      <VisAxis
        type="x"
        :grid-line="false"
        :tick-format="tickFormat"
        :tick-values="[0, 1, 2, 3, 4, 5]"
      />
      <VisAxis type="y" />
    </VisXYContainer>
    <VisXYContainer v-else :data="data" :height="400">
      <VisGroupedBar
        :x="x"
        :y="y"
        :rounded-corners="10"
        orientation="horizontal"
        :bar-padding="0.02"
      />
      <VisTooltip :triggers="triggers" />
      <VisAxis
        type="y"
        :tick-format="tickFormat"
        :tick-values="[0, 1, 2, 3, 4, 5]"
        :grid-line="false"
      />
      <VisAxis type="x" />
    </VisXYContainer>
  </ClientOnly>
</template>

<style>
  :root {
    --vis-tooltip-background-color: rgba(255, 255, 255, 0.95);
    --vis-tooltip-border-color: #e5e9f7;
    --vis-tooltip-text-color: black;
    --vis-tooltip-border-radius: 15px;
    --vis-tooltip-padding: 0px 0px;

    /* Dark Theme */
    --vis-dark-tooltip-background-color: rgba(30, 30, 30, 0.95);
    --vis-dark-tooltip-text-color: white;
    --vis-dark-tooltip-border-color: var(--color-gray-200);
  }
</style>
