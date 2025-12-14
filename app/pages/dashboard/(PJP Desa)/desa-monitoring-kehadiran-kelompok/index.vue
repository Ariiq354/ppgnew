<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";
  import { kelasGenerusEnum } from "~~/shared/enum";
  import { columns, type QueryType } from "./_constants";
  import { bulanFilterOptions, tahunOptions } from "~~/shared/constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("PJP Desa / Monitoring Kehadiran Kelompok");

  const query = reactive<QueryType>({
    search: "",
    page: 1,
    kelasPengajian: "PAUD",
  });

  const filterModal = ref(false);
  const { data: summary, refresh: rSummary } = await useFetch(
    `${APIBASE}/absensi-generus/desa/summary`,
    {
      query: {
        kelasPengajian: computed(() => query.kelasPengajian),
        kelompokId: computed(() => query.kelompokId),
        tahun: computed(() => query.tahun),
        bulan: computed(() => query.bulan),
      },
    }
  );

  const { data: datakelompok } = await useFetch(`${APIBASE}/options/kelompok`, {
    query: {
      desaId: authStore.user?.desaId,
    },
  });

  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(
    `${APIBASE}/absensi-generus/desa`,
    {
      query,
    }
  );

  watchOnce(
    () => query.kelompokId,
    () => {
      rSummary();
      refresh();
    }
  );
</script>

<template>
  <Title>PJP Desa | Monitoring Kehadiran Kelompok</Title>
  <LazyUModal v-model:open="filterModal" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <ClearableSelectMenu
          v-model="query.tahun"
          placeholder="Tahun"
          :items="tahunOptions"
        />
        <ClearableSelectMenu
          v-model="query.bulan"
          placeholder="Bulan"
          :items="bulanFilterOptions"
          label-key="name"
          value-key="value"
        />
        <ClearableSelectMenu
          v-model="query.kelompokId"
          placeholder="Kelompok"
          :items="datakelompok?.data"
          value-key="id"
          label-key="name"
        />
      </div>
    </template>
  </LazyUModal>
  <main class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <ClearableSelectMenu
          v-model="query.tahun"
          placeholder="Tahun"
          class="hidden flex-1 md:flex"
          :items="tahunOptions"
        />
        <ClearableSelectMenu
          v-model="query.bulan"
          placeholder="Bulan"
          class="hidden flex-1 md:flex"
          :items="bulanFilterOptions"
          label-key="name"
          value-key="value"
        />
        <ClearableSelectMenu
          v-model="query.kelompokId"
          placeholder="Kelompok"
          class="hidden flex-1 md:flex"
          :items="datakelompok?.data"
          value-key="id"
          label-key="name"
        />
        <UButton
          variant="subtle"
          icon="i-lucide-filter"
          class="md:hidden"
          @click="filterModal = true"
        />
        <USelectMenu
          v-model="query.kelasPengajian"
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
