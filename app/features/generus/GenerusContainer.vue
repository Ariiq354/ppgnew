<script setup lang="ts">
  import { pengajianEnum } from "~~/shared/enum";
  import QueryModal from "./components/QueryModal.vue";
  import ViewModal from "./components/ViewModal.vue";
  import { columns } from "./constants";
  import type { DataReturn, QueryType } from "./types";

  const authStore = useAuthStore();

  const filterModal = ref(false);
  const modalOpen = ref(false);

  const state = ref();

  const query = reactive<QueryType>({
    page: 1,
  });
  watch(
    () => [query.search, query.kelasPengajian, query.kelompokId],
    () => {
      if (query.page !== 1) query.page = 1;
    }
  );

  const { data, status } = await useFetch(`${APIBASE}/home/generus`, {
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
    <InputDesa
      v-model="query.desaId"
      :daerah-id="authStore.user?.daerahId"
      class="hidden flex-1 md:flex"
    />
    <InputKelompok
      v-model="query.kelompokId"
      :desa-id="query.desaId"
      class="hidden flex-1 md:flex"
    />
    <ClearableSelectMenu
      v-model="query.kelasPengajian"
      placeholder="Kelas Pengajian"
      class="hidden flex-1 md:flex"
      :items="[...pengajianEnum]"
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
