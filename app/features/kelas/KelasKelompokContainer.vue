<script setup lang="ts">
  import { kelasGenerusEnum } from "~~/shared/enum";
  import { columns } from "./constants";
  import type { DataReturn, QueryType } from "./types";
  import QueryModal from "./components/QueryModal.vue";
  import ViewModal from "./components/ViewModal.vue";
  import { bulanFilterOptions, tahunOptions } from "~~/shared/constants";

  const authStore = useAuthStore();
  const managePermission = authStore.hasPermission({
    pjp_kelompok: ["manage"],
  });

  const filterModal = ref(false);
  const modalOpen = ref(false);

  const state = ref();

  const query = reactive<QueryType>({
    page: 1,
  });
  watch(
    () => [query.search, query.tahun, query.bulan, query.nama],
    () => {
      if (query.page !== 1) query.page = 1;
    }
  );

  const { data, status } = await useFetch(`${APIBASE}/kelas-kelompok`, {
    query,
  });

  function clickView(itemData: DataReturn) {
    modalOpen.value = true;
    state.value = { ...itemData };
  }
  function clickEdit() {}
  function clickDelete() {}
</script>

<template>
  <ViewModal v-model:open="modalOpen" :data="state" />
  <QueryModal v-model:open="filterModal" v-model:query="query" />
  <div class="mb-4 flex gap-2 md:mb-6 md:gap-4">
    <InputSearch v-model="query.search" />
    <ClearableSelectMenu
      v-model="query.nama"
      placeholder="Kelas Pengajian"
      class="hidden flex-1 md:flex"
      :items="[...kelasGenerusEnum]"
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
  </div>
  <AppTable
    v-model:page="query.page"
    :columns="columns"
    :data="data?.data"
    :loading="status === 'pending'"
    :total="data?.metadata.total"
    enumerate
    :deletable="managePermission"
    :editable="managePermission"
    viewable
    selectable
    pagination
    @edit="clickEdit"
    @view="
      (i) => {
        clickView(i);
      }
    "
    @delete="clickDelete"
  />
</template>
