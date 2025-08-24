<script setup lang="ts">
  import { columns, statusOptions } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("Dashboard / Tenaga Pengajar");

  const filterModal = ref(false);
  const query = reactive({
    search: "",
    page: 1,
    status: "",
    daerahId: authStore.user?.daerahId,
    desaId: "",
    kelompokId: "",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 500);
  const { status } = await useFetch(`${APIBASE}/home/pengajar`, {
    query,
  });

  const { data: dataDesa, status: statusDesa } = await useFetch(
    `${APIBASE}/options/desa`,
    {
      query: {
        daerahId: computed(() => query.daerahId),
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
    () => [query.status, query.kelompokId, query.daerahId],
    () => {
      query.page = 1;
    }
  );
</script>

<template>
  <Title>Dashboard | Tenaga Pengajar</Title>
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
          v-model="query.status"
          placeholder="Status"
          :items="statusOptions"
          label-key="name"
          value-key="value"
        />
      </div>
    </template>
  </LazyUModal>
  <main>
    <UCard>
      <div class="mb-6 flex gap-2 md:gap-4">
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
          v-model="query.status"
          placeholder="Status"
          class="hidden flex-1 md:flex"
          :items="statusOptions"
          label-key="name"
          value-key="value"
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
        :data="[]"
        :loading="status === 'pending'"
        :total="0"
        viewable
        enumerate
        pagination
      />
    </UCard>
  </main>
</template>
