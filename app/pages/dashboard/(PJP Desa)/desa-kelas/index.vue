<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import {
    columns,
    getInitialFormData,
    schema,
    pengajianOptions,
    tahunOptions,
    bulanOptions,
  } from "./_constants";
  import type { Schema } from "./_constants";
  import { useConstantStore } from "~/stores/constant";
  import { useAuthStore } from "~/stores/auth";
  import { useSubmit } from "~/composables/function";
  import { useToastError } from "~/composables/toast";
  import { openConfirmModal } from "~/composables/modal";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const desaEdit = authStore.hasPermission({
    pjp_desa: ["manage"],
  });
  constantStore.setTitle("PJP Desa / Daftar Kelas");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
    tahun: "",
    bulan: "Januari",
    nama: "",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/kelas-desa`, {
    query,
  });

  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/kelas-desa`;
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
    openConfirmModal("/kelas-desa", { id: ids }, refresh);
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
  <Title>PJP Desa | Daftar Kelas</Title>
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
          id="kelas-desa-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Kelas Pengajian" name="nama">
            <USelectMenu
              v-model="state.nama"
              :disabled="isLoading || !desaEdit || viewStatus"
              :items="pengajianOptions"
            />
          </UFormField>
          <UFormField label="Tanggal" name="tanggal">
            <UInput
              v-model="state.tanggal"
              :disabled="isLoading || !desaEdit || viewStatus"
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
          form="kelas-desa-form"
        >
          Simpan
        </UButton>
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
          :items="pengajianOptions"
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
          :items="[...bulanOptions]"
          label-key="name"
          value-key="value"
        />
        <AppTambahExport
          :add-permission="desaEdit"
          :add-function="clickAdd"
          path="kelas-desa/export"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :deletable="desaEdit"
        :editable="desaEdit"
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
