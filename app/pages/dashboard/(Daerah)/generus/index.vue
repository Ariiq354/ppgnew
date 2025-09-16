<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns, kelasOptions, pengajianOptions } from "./_constants";
  import { useAuthStore } from "~/stores/auth";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("Dashboard / Generus");

  const filterModal = ref(false);
  const query = reactive({
    search: "",
    page: 1,
    kelasSekolah: "",
    kelasPengajian: "",
    desaId: "",
    kelompokId: "",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 500);
  const { data, status } = await useFetch(`${APIBASE}/home/generus`, {
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
    () => [
      query.kelasPengajian,
      query.kelompokId,
      query.kelasSekolah,
      query.desaId,
    ],
    () => {
      query.page = 1;
    }
  );
</script>

<template>
  <Title>Dashboard | Generus</Title>
  <LazyUModal v-model:open="filterModal" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <ClearableSelectMenu
          v-model="query.desaId"
          placeholder="Desa"
          :items="dataDesa?.data"
          value-key="id"
          label-key="name"
          :loading="statusDesa === 'pending'"
        />
        <ClearableSelectMenu
          v-model="query.kelompokId"
          placeholder="Kelompok"
          :items="datakelompok?.data"
          value-key="id"
          label-key="name"
          :loading="statusKelompok === 'pending'"
        />
        <ClearableSelectMenu
          v-model="query.kelasSekolah"
          placeholder="Kelas Sekolah"
          :items="kelasOptions"
        />
        <ClearableSelectMenu
          v-model="query.kelasPengajian"
          placeholder="Kelas Pengajian"
          :items="pengajianOptions"
        />
      </div>
    </template>
  </LazyUModal>
  <main>
    <UCard>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row">
        <UInput
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
        <ClearableSelectMenu
          v-model="query.kelasSekolah"
          placeholder="Kelas Sekolah"
          class="hidden flex-1 md:flex"
          :items="kelasOptions"
        />
        <ClearableSelectMenu
          v-model="query.kelasPengajian"
          placeholder="Kelas Pengajian"
          class="hidden flex-1 md:flex"
          :items="pengajianOptions"
        />
        <UButton
          variant="subtle"
          icon="i-lucide-filter"
          class="md:hidden"
          @click="filterModal = true"
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
        viewable
      />
    </UCard>
  </main>
</template>
