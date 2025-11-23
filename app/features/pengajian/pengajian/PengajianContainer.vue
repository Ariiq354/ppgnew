<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import CreateModal from "./components/CreateModal.vue";
  import ViewModal from "./components/ViewModal.vue";
  import { columns, getInitialFormData, type Schema } from "./constants";
  import type { DataReturn, QueryType } from "./types";

  const authStore = useAuthStore();
  const manageEdit = authStore.hasPermission({ pjp_kelompok: ["manage"] });

  const modalOpen = ref(false);
  const modalCreateOpen = ref(false);

  const state = ref(getInitialFormData());

  const query = reactive<QueryType>({
    page: 1,
  });
  watch(
    () => [query.search],
    () => {
      if (query.page !== 1) query.page = 1;
    }
  );

  const { data, status, refresh } = await useFetch(`${APIBASE}/pengajian`, {
    query,
  });

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/pengajian`;
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
    openConfirmModal("/pengajian", { id: ids }, refresh);
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
  <div class="mb-4 flex gap-2 md:mb-6 md:gap-4">
    <InputSearch v-model="query.search" />
    <AppTambahExport
      :add-permission="manageEdit"
      :add-function="clickAdd"
      :path="`pengajian/export`"
    />
  </div>
  <AppTable
    v-model:page="query.page"
    :columns="columns"
    :data="data?.data"
    :loading="status === 'pending'"
    :total="data?.metadata.total"
    enumerate
    :deletable="manageEdit"
    :editable="manageEdit"
    viewable
    selectable
    pagination
    @edit="clickUpdate"
    @view="clickView"
    @delete="clickDelete"
  />
</template>
