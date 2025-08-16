<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE } from "~/utils";
  import {
    bidangOptions,
    columns,
    getInitialFormData,
    schema,
  } from "./_constants";
  import type { Schema } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const pengurusEdit = await authStore.hasPermission({
    sekretariat: ["create"],
  });
  constantStore.setTitle("Sekretariat / Pengurus");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
    bidang: "sekretariat",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/pengurus`, {
    query,
  });

  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/pengurus`;
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
    openConfirmModal("/pengurus", ids, refresh);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
    viewStatus.value = false;
  }
</script>

<template>
  <Title>Sekretariat | Pengurus</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="
        (state.id ? (viewStatus ? 'Detail' : 'Edit') : 'Tambah') + ' Pengurus'
      "
      class="min-w-4xl"
    >
      <template #body>
        <UForm
          id="pengurus-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Nama" name="nama">
            <UInput
              v-model="state.nama"
              type="number"
              :disabled="isLoading || !pengurusEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Bidang" name="bidang">
            <USelectMenu
              v-model="state.bidang"
              placeholder="Pilih bidang"
              :items="bidangOptions"
              value-key="value"
              label-key="name"
              :disabled="isLoading || !pengurusEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Tempat Lahir" name="tempatLahir">
            <UInput
              v-model="state.tempatLahir"
              :disabled="isLoading || !pengurusEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Tanggal Lahir" name="tanggalLahir">
            <UInput
              v-model="state.tanggalLahir"
              type="date"
              :disabled="isLoading || !pengurusEdit || viewStatus"
            />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <UButton
          icon="i-heroicons-x-mark-16-solid"
          variant="ghost"
          :disabled="isLoading"
          @click="modalOpen = false"
        >
          {{ viewStatus ? "Tutup" : "Batal" }}
        </UButton>
        <UButton
          v-if="!viewStatus"
          type="submit"
          icon="i-heroicons-check-16-solid"
          :loading="isLoading"
          form="pengurus-form"
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
          leading-icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
        <AppTambahExport
          :add-permission="pengurusEdit"
          :add-function="clickAdd"
          path="pengurus"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :deletable="pengurusEdit"
        :editable="pengurusEdit"
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
