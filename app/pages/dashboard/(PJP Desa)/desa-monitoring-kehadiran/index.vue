<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns, pengajianOptions } from "./_constants";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("PJP Desa / Monitoring Kehadiran");

  const namaKelas = ref("PAUD");
  const { data: summary } = await useFetch(
    `${APIBASE}/absensi-desa/monitoring/summary`,
    {
      query: {
        kelasPengajian: namaKelas,
      },
    }
  );

  const { data: datakelompok } = await useFetch(`${APIBASE}/options/kelompok`, {
    query: {
      desaId: authStore.user?.desaId,
    },
  });

  const filterModal = ref(false);

  const query = reactive({
    search: "",
    page: 1,
    kelompokId: "",
    kelasPengajian: namaKelas,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(
    `${APIBASE}/absensi-desa/monitoring`,
    {
      query,
    }
  );
</script>

<template>
  <Title>PJP Desa | Monitoring Kehadiran</Title>
  <LazyUModal v-model:open="filterModal" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
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
      <div class="mb-6 flex gap-2 md:gap-4">
        <UInput
          size="xl"
          class="flex-5"
          leading-icon="i-lucide-search"
          placeholder="Search..."
          @update:model-value="searchDebounced"
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
