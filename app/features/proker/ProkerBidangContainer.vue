<script setup lang="ts">
  import { bulanEnum, type bidangEnum } from "~~/shared/enum";
  import { mingguOptions, tahunOptions } from "~~/shared/constants";
  import QueryModal from "./components/QueryModal.vue";
  import ViewModal from "./components/ViewModal.vue";
  import { columns, getInitialFormData, type Schema } from "./constants";
  import type { DataReturn, QueryType } from "./types";
  import type { FormSubmitEvent } from "@nuxt/ui";
  import CreateModal from "./components/CreateModal.vue";

  const authStore = useAuthStore();
  const prokerEdit = authStore.hasPermission({ proker: ["manage"] });

  const props = defineProps<{
    bidang: (typeof bidangEnum)[number];
  }>();

  const filterModal = ref(false);
  const modalOpen = ref(false);
  const modalCreateOpen = ref(false);

  const state = ref(getInitialFormData(props.bidang));

  const query = reactive<QueryType>({
    bidang: props.bidang,
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

  const { data, status, refresh } = await useFetch(`${APIBASE}/proker`, {
    query,
  });

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/proker`;
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
    state.value = getInitialFormData(props.bidang);
    modalCreateOpen.value = true;
  }

  async function clickDelete(ids: number[]) {
    openConfirmModal("/proker", { id: ids, bidang: props.bidang }, refresh);
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
    <AppTambahExport
      :add-permission="prokerEdit"
      :add-function="clickAdd"
      :path="`proker/export?bidang=${props.bidang}`"
    />
  </div>
  <AppTable
    v-model:page="query.page"
    :columns="columns"
    :data="data?.data"
    :loading="status === 'pending'"
    :total="data?.metadata.total"
    enumerate
    :deletable="prokerEdit"
    :editable="prokerEdit"
    viewable
    selectable
    pagination
    @edit="clickUpdate"
    @view="clickView"
    @delete="clickDelete"
  />
</template>
