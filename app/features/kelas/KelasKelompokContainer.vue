<script setup lang="ts">
  import { kelasGenerusEnum } from "~~/shared/enum";
  import { columns, getInitialFormData, type Schema } from "./constants";
  import type { DataReturn, QueryType } from "./types";
  import QueryModal from "./components/QueryModal.vue";
  import ViewModal from "./components/ViewModal.vue";
  import { bulanFilterOptions, tahunOptions } from "~~/shared/constants";
  import type { FormSubmitEvent } from "@nuxt/ui";
  import CreateModal from "./components/CreateModal.vue";

  const authStore = useAuthStore();
  const managePermission = authStore.hasPermission({
    pjp_kelompok: ["manage"],
  });

  const filterModal = ref(false);
  const modalOpen = ref(false);
  const modalCreateOpen = ref(false);

  const state = ref(getInitialFormData());

  const query = reactive<QueryType>({
    page: 1,
  });
  watch(
    () => [query.search, query.tahun, query.bulan, query.nama],
    () => {
      if (query.page !== 1) query.page = 1;
    }
  );

  const { data, status, refresh } = await useFetch(
    `${APIBASE}/kelas-kelompok`,
    {
      query,
    }
  );

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/kelas-kelompok`;
    await execute({
      path: state.value.id ? `${basePath}/${state.value.id}` : basePath,
      body: event.data,
      method: state.value.id ? "PUT" : "POST",
      onSuccess() {
        modalCreateOpen.value = false;
        refresh();
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
  }

  function clickAdd() {
    state.value = getInitialFormData();
    modalCreateOpen.value = true;
  }

  async function clickDelete(ids: number[]) {
    openConfirmModal("/kelas-kelompok", { id: ids }, refresh);
  }

  function clickUpdate(itemData: DataReturn) {
    modalCreateOpen.value = true;
    state.value = itemData;
  }

  function clickView(itemData: DataReturn) {
    modalOpen.value = true;
    state.value = itemData;
  }
</script>

<template>
  <CreateModal
    v-model:open="modalCreateOpen"
    v-model:state="state"
    :is-loading="isLoading"
    :on-submit="onSubmit"
  />
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
    <AppTambahExport
      :add-permission="managePermission"
      :add-function="clickAdd"
      :path="`kelas-kelompok/export`"
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
    @edit="clickUpdate"
    @view="clickView"
    @delete="clickDelete"
  />
</template>
