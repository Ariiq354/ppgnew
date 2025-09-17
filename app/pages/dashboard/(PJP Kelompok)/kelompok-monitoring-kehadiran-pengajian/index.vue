<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns } from "./_constants";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Monitoring Kehadiran Pengajian");

  const { data: summary } = await useFetch(
    `${APIBASE}/absensi-jamaah/monitoring/summary`
  );

  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(
    `${APIBASE}/absensi-jamaah/monitoring`,
    {
      query,
    }
  );
</script>

<template>
  <Title>PJP Kelompok | Monitoring Kehadiran Pengajian</Title>
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
      <div class="mb-6 flex gap-2 md:gap-4">
        <UInput
          size="xl"
          class="flex-5"
          leading-icon="i-lucide-search"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
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
