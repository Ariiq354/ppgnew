<script setup lang="ts">
  type ChartDatum = { name: string; value: number };
  type ChartProps = {
    title: string;
    subtitle: string;
    data: ChartDatum[];
  };

  const colors = [
    "#3b82f6", // Blue
    "#22c55e", // Green
    "#f59e0b", // Amber/Orange
    "#a855f7", // Purple
    "#06b6d4", // Teal
    "#ef4444", // Red
  ];

  const props = defineProps<ChartProps>();

  const datum = ref<number[]>([]);

  const labels = ref<{ name: string; color: string }[]>([]);

  for (const [index, i] of props.data.entries()) {
    datum.value.push(i.value);
    labels.value.push({ name: i.name, color: colors[index]! });
  }
  const categories: Record<string, BulletLegendItemInterface> =
    Object.fromEntries(
      labels.value.map((i) => [i.name, { name: i.name, color: i.color }])
    );
</script>

<template>
  <div class="flex flex-col gap-4 text-center">
    <p class="text-xl font-bold">{{ title }}</p>

    <ClientOnly>
      <template #fallback>
        <USkeleton class="h-[500px] w-full" />
      </template>
      <DonutChart
        :data="datum"
        :height="275"
        :categories="categories"
        :hide-legend="true"
        :radius="0"
        :arc-width="50"
      >
        <div class="text-center">
          <div class="font-semibold">
            {{ datum.reduce((a, i) => (a += i), 0) }}
          </div>
          <div class="text-muted">{{ subtitle }}</div>
        </div>
      </DonutChart>
      <div class="text-muted flex justify-between text-xs">
        <div>{{ subtitle }}</div>
        <div>Jumlah</div>
      </div>
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex w-full items-center justify-between text-sm"
      >
        <div class="flex items-center gap-4">
          <div
            class="h-4 w-1"
            :style="{ backgroundColor: colors[index] }"
          ></div>
          <div class="text-muted">{{ item.name }}</div>
        </div>
        <div>{{ item.value }}</div>
      </div>
    </ClientOnly>
  </div>
</template>
