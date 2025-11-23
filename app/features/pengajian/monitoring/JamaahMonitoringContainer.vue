<script setup lang="ts">
  import { columns } from "./constants";
  import type { QueryType } from "./types";

  const { data: summary } = await useFetch(
    `${APIBASE}/absensi-jamaah/monitoring/summary`
  );

  const query = reactive<QueryType>({
    page: 1,
  });
  const { data, status } = await useFetch(
    `${APIBASE}/absensi-jamaah/monitoring`,
    {
      query,
    }
  );
</script>

<template>
  <main class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <UCard>
        <p class="flex items-center gap-4 text-4xl font-bold">
          <UIcon name="i-lucide-users" />
          {{ summary?.data.countJamaah }}
        </p>
        <p class="text-muted">Total Jamaah</p>
      </UCard>
      <UCard>
        <p class="flex items-center gap-4 text-4xl font-bold">
          <UIcon name="i-lucide-trending-up" />
          {{ summary?.data.kehadiran }}%
        </p>
        <p class="text-muted">Kehadiran</p>
      </UCard>
    </div>
    <UCard>
      <div class="mb-4 flex gap-2 md:mb-6 md:gap-4">
        <InputSearch v-model="query.search" />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        pagination
      >
      </AppTable>
    </UCard>
  </main>
</template>
