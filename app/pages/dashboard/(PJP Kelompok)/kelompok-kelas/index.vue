<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns, getInitialFormData, schema } from "./_constants";
  import type { QueryType, Schema } from "./_constants";
  import { useConstantStore } from "~/stores/constant";
  import { useAuthStore } from "~/stores/auth";
  import { useSubmit } from "~/composables/function";
  import { useToastError } from "~/composables/toast";
  import { openConfirmModal } from "~/composables/modal";
  import { tahunOptions, bulanFilterOptions } from "~~/shared/contants";
  import { kelasGenerusEnum } from "~~/shared/enum";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const kelompokEdit = authStore.hasPermission({
    pjp_kelompok: ["manage"],
  });
  constantStore.setTitle("PJP Kelompok / Daftar Kelas");

  const state = ref(getInitialFormData());
  const query = reactive<QueryType>({
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(
    `${APIBASE}/kelas-kelompok`,
    {
      query,
    }
  );

  const filterModal = ref(false);
  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/kelas-kelompok`;
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
    openConfirmModal("/kelas-kelompok", { id: ids }, refresh);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
    viewStatus.value = false;
  }

  watch(
    () => [query.search, query.tahun, query.bulan, query.nama],
    () => {
      query.page = 1;
    }
  );
</script>

<template>
  <Title>PJP Kelompok | Daftar Kelas</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="
        (state.id ? (viewStatus ? 'Detail' : 'Edit') : 'Tambah') + ' Kelas'
      "
      class="max-w-2xl"
    >
      <template #body>
        <UForm
          id="kelas-kelompok-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Kelas Pengajian" name="nama">
            <USelectMenu
              v-model="state.nama"
              :disabled="isLoading || !kelompokEdit || viewStatus"
              :items="[...kelasGenerusEnum]"
            />
          </UFormField>
          <UFormField label="Tanggal" name="tanggal">
            <UInput
              v-model="state.tanggal"
              :disabled="isLoading || !kelompokEdit || viewStatus"
              type="date"
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
          form="kelas-kelompok-form"
        >
          Simpan
        </UButton>
      </template>
    </LazyUModal>
    <LazyUModal v-model:open="filterModal" title="Filter">
      <template #body>
        <div class="flex flex-col gap-4">
          <ClearableSelectMenu
            v-model="query.nama"
            placeholder="Kelas Pengajian"
            :items="[...kelasGenerusEnum]"
          />
          <ClearableSelectMenu
            v-model="query.tahun"
            placeholder="Tahun"
            :items="tahunOptions"
          />
          <ClearableSelectMenu
            v-model="query.bulan"
            placeholder="Bulan"
            :items="bulanFilterOptions"
            label-key="name"
            value-key="value"
          />
        </div>
      </template>
    </LazyUModal>
    <UCard>
      <div class="mb-4 flex gap-2 md:mb-6 md:gap-4">
        <UInput
          size="xl"
          class="flex-5"
          leading-icon="i-lucide-search"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
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
        <UButton
          variant="subtle"
          icon="i-lucide-filter"
          class="md:hidden"
          @click="filterModal = true"
        />
        <AppTambahExport
          :add-permission="kelompokEdit"
          :add-function="clickAdd"
          path="kelas-kelompok/export"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :deletable="kelompokEdit"
        :editable="kelompokEdit"
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
