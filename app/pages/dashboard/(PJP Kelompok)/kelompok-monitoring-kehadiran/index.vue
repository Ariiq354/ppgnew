<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns, pengajianOptions } from "./_constants";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Monitoring Kehadiran");

  const namaKelas = ref("PAUD");
  const { data: summary } = await useFetch(
    `${APIBASE}/absensi-generus/monitoring/summary`,
    {
      query: {
        kelasPengajian: namaKelas,
      },
    }
  );

  const query = reactive({
    search: "",
    page: 1,
    kelasPengajian: namaKelas,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(
    `${APIBASE}/absensi-generus/monitoring`,
    {
      query,
    }
  );
</script>

<template>
  <Title>PJP Kelompok | Monitoring Kehadiran</Title>
  <main class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <UCard>
        <p class="flex items-center gap-4 text-4xl font-bold">
          <UIcon name="i-lucide-users" />
          {{ summary?.data.countGenerus }}
        </p>
        <p class="text-muted">Total Generus</p>
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
        <UInput
          size="xl"
          class="flex-5"
          leading-icon="i-lucide-search"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
        <USelectMenu
          v-model="namaKelas"
          class="flex-1"
          :items="pengajianOptions"
          :disabled="status === 'pending'"
          placeholder="Pilih Pengajian"
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
