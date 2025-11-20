<script setup lang="ts">
  import { bulanEnum } from "~~/shared/enum";
  import {
    columns,
    tahunOptions,
    mingguOptions,
    bidangOptions,
  } from "./constants";
  import type { DataReturn, QueryType } from "./types";
  import QueryModal from "./components/QueryModal.vue";
  import ViewModal from "./components/ViewModal.vue";

  const filterModal = ref(false);
  const modalOpen = ref(false);

  const state = ref();

  const query = reactive<QueryType>({
    page: 1,
  });
  watch(
    () => [
      query.search,
      query.bulan,
      query.tahun,
      query.mingguKe,
      query.bidang,
    ],
    () => {
      if (query.page !== 1) query.page = 1;
    }
  );

  const { data, status } = await useFetch(`${APIBASE}/home/proker`, {
    query,
  });

  function clickView(itemData: DataReturn) {
    modalOpen.value = true;
    state.value = { ...itemData };
  }
</script>

<template>
  <ViewModal v-model:open="modalOpen" :data="state" />
  <QueryModal v-model:open="filterModal" v-model:query="query" />
  <div class="mb-4 flex gap-2 md:mb-6 md:gap-4">
    <InputSearch v-model="query.search" />
    <ClearableSelectMenu
      v-model="query.bidang"
      placeholder="Bidang"
      class="hidden flex-1 md:flex"
      :items="bidangOptions"
      value-key="value"
      label-key="name"
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
      :items="[...bulanEnum]"
    />
    <ClearableSelectMenu
      v-model="query.mingguKe"
      placeholder="Minggu"
      class="hidden flex-1 md:flex"
      :items="mingguOptions"
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
    viewable
    enumerate
    pagination
    @view="(i) => clickView(i)"
  />
</template>
