<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns } from "./_constants";
  import { APIBASE } from "~/utils";
  import { kelasGenerusEnum } from "~~/shared/enum";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Monitoring Kehadiran");

  const namaKelas = ref<(typeof kelasGenerusEnum)[number]>("PAUD");
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
    <div class="sm: grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
              <UIcon name="i-lucide-users" />
              {{ summary?.data.dataPaud.countGenerus }}
            </p>
            <p class="text-muted">Total Paud</p>
          </div>
          <div>
            <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
              {{ summary?.data.dataPaud.kehadiran }}%
            </p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
              <UIcon name="i-lucide-users" />
              {{ summary?.data.dataCabeRawit.countGenerus }}
            </p>
            <p class="text-muted">Total Cabe Rawit</p>
          </div>
          <div>
            <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
              {{ summary?.data.dataCabeRawit.kehadiran }}%
            </p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
              <UIcon name="i-lucide-users" />
              {{ summary?.data.dataPraremaja.countGenerus }}
            </p>
            <p class="text-muted">Total Praremaja</p>
          </div>
          <div>
            <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
              {{ summary?.data.dataPraremaja.kehadiran }}%
            </p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
              <UIcon name="i-lucide-users" />
              {{ summary?.data.dataMudamudi.countGenerus }}
            </p>
            <p class="text-muted">Total Muda-mudi</p>
          </div>
          <div>
            <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
              {{ summary?.data.dataMudamudi.kehadiran }}%
            </p>
          </div>
        </div>
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
          :items="[...kelasGenerusEnum]"
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
