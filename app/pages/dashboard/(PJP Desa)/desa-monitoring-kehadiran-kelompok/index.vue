<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";
  import { kelasGenerusEnum } from "~~/shared/enum";
  import { columns } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("PJP Desa / Monitoring Kehadiran Kelompok");

  const namaKelas = ref<(typeof kelasGenerusEnum)[number]>("PAUD");
  const kelompokId = ref<number>();
  const filterModal = ref(false);
  const { data: summary, refresh: rSummary } = await useFetch(
    `${APIBASE}/absensi-generus/desa/summary`,
    {
      query: {
        kelasPengajian: namaKelas,
        kelompokId: kelompokId,
      },
    }
  );

  const { data: datakelompok } = await useFetch(`${APIBASE}/options/kelompok`, {
    query: {
      desaId: authStore.user?.desaId,
    },
  });

  const query = reactive({
    search: "",
    page: 1,
    kelasPengajian: namaKelas,
    kelompokId: kelompokId,
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

  watchOnce(kelompokId, () => {
    rSummary();
    refresh();
  });
</script>

<template>
  <Title>PJP Desa | Monitoring Kehadiran Kelompok</Title>
  <LazyUModal v-model:open="filterModal" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <USelectMenu
          v-model="kelompokId"
          placeholder="Kelompok"
          :items="datakelompok?.data"
          value-key="id"
          label-key="name"
        />
      </div>
    </template>
  </LazyUModal>
  <main class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <UCard>
        <p class="flex items-center gap-4 text-4xl font-bold">
          <UIcon name="i-lucide-users" />
          {{ summary?.data.countGenerus ?? 0 }}
        </p>
        <p class="text-muted">Total Generus</p>
      </UCard>
      <UCard>
        <p class="flex items-center gap-4 text-4xl font-bold">
          <UIcon name="i-lucide-trending-up" />
          {{ summary?.data.kehadiran ?? 0 }}%
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
          v-model="kelompokId"
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
