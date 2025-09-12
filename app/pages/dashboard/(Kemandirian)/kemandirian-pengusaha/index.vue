<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns, getInitialFormData, schema } from "./_constants";
  import type { Schema } from "./_constants";
  import { useConstantStore } from "~/stores/constant";
  import { useAuthStore } from "~/stores/auth";
  import { useSubmit } from "~/composables/function";
  import { useToastError } from "~/composables/toast";
  import { openConfirmModal } from "~/composables/modal";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const kemandirianEdit = authStore.hasPermission({
    kemandirian: ["manage"],
  });
  constantStore.setTitle("Kemandirian / Daftar Pengusaha");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/pengusaha`, {
    query,
  });

  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/pengusaha`;
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
    openConfirmModal("/pengusaha", { id: ids }, refresh);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
    viewStatus.value = false;
  }
</script>

<template>
  <Title>Kemandirian | Daftar Pengusaha</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="
        (state.id ? (viewStatus ? 'Detail' : 'Edit') : 'Tambah') + ' Musyawarah'
      "
      class="max-w-2xl"
    >
      <template #body>
        <UForm
          id="pengusaha-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Nama Pengusaha" name="nama">
            <UInput
              v-model="state.nama"
              :disabled="isLoading || !kemandirianEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Bidang Pekerjaan" name="bidangPekerjaan">
            <UInput
              v-model="state.bidangPekerjaan"
              :disabled="isLoading || !kemandirianEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Nama Usaha" name="namaUsaha">
            <UInput
              v-model="state.namaUsaha"
              :disabled="isLoading || !kemandirianEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="No Telepon" name="noTelepon">
            <UInput
              v-model="state.noTelepon"
              :disabled="isLoading || !kemandirianEdit || viewStatus"
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
          form="pengusaha-form"
        >
          Simpan
        </UButton>
      </template>
    </LazyUModal>
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
          :add-permission="kemandirianEdit"
          :add-function="clickAdd"
          path="pengusaha/export"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :deletable="kemandirianEdit"
        :editable="kemandirianEdit"
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
