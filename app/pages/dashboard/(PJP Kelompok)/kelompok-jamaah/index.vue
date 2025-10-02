<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { useSubmit } from "~/composables/function";
  import { openConfirmModal } from "~/composables/modal";
  import { useToastError } from "~/composables/toast";
  import { useAuthStore } from "~/stores/auth";
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import type { Schema } from "./_constants";
  import { columns, getInitialFormData, schema } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const jamaahEdit = authStore.hasPermission({
    pjp_kelompok: ["manage"],
  });
  constantStore.setTitle("PJP Kelompok / Jamaah");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/jamaah`, {
    query,
  });

  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/jamaah`;
    await execute({
      path: state.value.id ? `${basePath}/${state.value.id}` : basePath,
      body: event.data,
      method: state.value.id ? "PUT" : "POST",
      onSuccess() {
        modalOpen.value = false;
        refresh();
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
  }

  function clickAdd() {
    state.value = getInitialFormData();
    modalOpen.value = true;
    viewStatus.value = false;
  }

  async function clickDelete(ids: number[]) {
    openConfirmModal("/jamaah", { id: ids }, refresh);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = { ...itemData };
    viewStatus.value = false;
  }

  watch(
    () => [query.search],
    () => {
      query.page = 1;
    }
  );
</script>

<template>
  <Title>PJP Kelompok | Jamaah</Title>
  <LazyUModal
    v-model:open="modalOpen"
    :title="
      (state.id ? (viewStatus ? 'Detail' : 'Edit') : 'Tambah') + ' Jamaah'
    "
    class="max-w-4xl"
  >
    <template #body>
      <UForm
        id="jamaah-form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Nama" name="nama">
          <UInput
            v-model="state.nama"
            :disabled="isLoading || !jamaahEdit || viewStatus"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton
        icon="i-lucide-x"
        variant="ghost"
        :disabled="isLoading"
        @click="modalOpen = false"
      >
        {{ viewStatus ? "Tutup" : "Batal" }}
      </UButton>
      <UButton
        v-if="!viewStatus"
        type="submit"
        icon="i-lucide-check"
        :loading="isLoading"
        form="jamaah-form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
  <main>
    <UCard>
      <div class="mb-6 flex gap-2 md:gap-4">
        <UInput
          size="xl"
          class="flex-5"
          leading-icon="i-lucide-search"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
        <AppTambahExport
          :add-permission="jamaahEdit"
          :add-function="clickAdd"
          path="jamaah/export"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :deletable="jamaahEdit"
        :editable="jamaahEdit"
        viewable
        selectable
        pagination
        @edit="clickUpdate"
        @view="
          (i) => {
            clickUpdate(i);
            viewStatus = true;
          }
        "
        @delete="clickDelete"
      />
    </UCard>
  </main>
</template>
