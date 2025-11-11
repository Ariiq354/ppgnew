<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns } from "./_constants";
  import { APIBASE } from "~/utils";
  import { daerahKelas } from "~~/shared/contants";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kurikulum / Monitoring Kehadiran Desa");
  const authStore = useAuthStore();

  const namaKelas = ref("Muda-mudi");
  const { data: summary } = await useFetch(
    `${APIBASE}/absensi-desa/daerah/summary`,
    {
      query: {
        kelasPengajian: namaKelas,
      },
    }
  );

  const query = reactive({
    search: "",
    page: 1,
    desaId: "",
    kelompokId: "",
    kelasPengajian: namaKelas,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(`${APIBASE}/absensi-desa/daerah`, {
    query,
  });

  const { data: dataDesa, status: statusDesa } = await useFetch(
    `${APIBASE}/options/desa`,
    {
      query: {
        daerahId: computed(() => authStore.user?.daerahId),
      },
      onResponse() {
        query.kelompokId = "";
      },
    }
  );
  const {
    data: datakelompok,
    status: statusKelompok,
    refresh,
  } = await useFetch(`${APIBASE}/options/kelompok`, {
    immediate: false,
    query: {
      desaId: computed(() => query.desaId),
    },
  });

  watchOnce(
    () => query.desaId,
    () => refresh()
  );

  watch(
    () => query.desaId,
    () => {
      query.kelompokId = "";
    }
  );

  watch(
    () => [query.search, query.kelasPengajian, query.kelompokId, query.desaId],
    () => {
      query.page = 1;
    }
  );
</script>

<template>
  <Title>Kurikulum | Monitoring Kehadiran</Title>
  <main class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <UCard>
        <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
          <UIcon name="i-lucide-users" />
          {{ summary?.data.countGenerus }}
        </p>
        <p class="text-muted">Total Generus</p>
      </UCard>
      <UCard>
        <p class="flex items-center gap-4 text-3xl font-bold md:text-4xl">
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
        <ClearableSelectMenu
          v-model="query.desaId"
          placeholder="Desa"
          class="hidden flex-1 md:flex"
          :items="dataDesa?.data"
          value-key="id"
          label-key="name"
          :loading="statusDesa === 'pending'"
        />
        <ClearableSelectMenu
          v-model="query.kelompokId"
          placeholder="Kelompok"
          class="hidden flex-1 md:flex"
          :items="datakelompok?.data"
          value-key="id"
          label-key="name"
          :loading="statusKelompok === 'pending'"
        />
        <USelectMenu
          v-model="namaKelas"
          class="flex-1"
          :items="daerahKelas"
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
