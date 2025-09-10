<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import {
    bulanOptions,
    columns,
    getInitialFormData,
    schema,
    statusOptions,
  } from "./_constants";
  import type { Schema } from "./_constants";
  import { useConstantStore } from "~/stores/constant";
  import { useAuthStore } from "~/stores/auth";
  import { useSubmit } from "~/composables/function";
  import { useToastError } from "~/composables/toast";
  import { openConfirmModal } from "~/composables/modal";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const prokerManage = authStore.hasPermission({ proker: ["manage"] });
  constantStore.setTitle("Kegiatan Muda-Mudi / Proker");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
    bidang: "kegiatan_muda_mudi",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/proker`, {
    query,
  });

  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/proker`;
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
    openConfirmModal("/proker/bidang/kegiatan_muda_mudi", { id: ids }, refresh);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
    viewStatus.value = false;
  }
</script>

<template>
  <Title>Kegiatan Muda-Mudi | Proker</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="
        (state.id ? (viewStatus ? 'Detail' : 'Edit') : 'Tambah') + ' Proker'
      "
      class="max-w-4xl"
    >
      <template #body>
        <UForm
          id="proker-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Minggu Ke" name="mingguKe">
            <UInput
              v-model="state.mingguKe"
              type="number"
              :disabled="isLoading || !prokerManage || viewStatus"
            />
          </UFormField>
          <UFormField label="Bulan" name="bulan">
            <USelectMenu
              v-model="state.bulan"
              placeholder="Pilih bulan"
              :items="bulanOptions"
              :disabled="isLoading || !prokerManage || viewStatus"
            />
          </UFormField>
          <UFormField label="Tahun" name="tahun">
            <UInput
              v-model="state.tahun"
              :disabled="isLoading || !prokerManage || viewStatus"
              type="number"
            />
          </UFormField>
          <UFormField label="Peserta" name="peserta">
            <UInput
              v-model="state.peserta"
              :disabled="isLoading || !prokerManage || viewStatus"
            />
          </UFormField>
          <UFormField label="Biaya" name="biaya">
            <UInput
              v-model="state.biaya"
              type="number"
              :disabled="isLoading || !prokerManage || viewStatus"
            />
          </UFormField>
          <UFormField label="Kegiatan" name="kegiatan">
            <UTextarea
              v-model="state.kegiatan"
              :disabled="isLoading || !prokerManage || viewStatus"
            />
          </UFormField>
          <UFormField label="Keterangan" name="keterangan">
            <UTextarea
              v-model="state.keterangan"
              :disabled="isLoading || !prokerManage || viewStatus"
            />
          </UFormField>
          <UFormField label="Status" name="status">
            <USelectMenu
              v-model="state.status"
              placeholder="Pilih status"
              :items="statusOptions"
              :disabled="isLoading || !prokerManage || viewStatus"
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
          form="proker-form"
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
          :add-permission="prokerManage"
          :add-function="clickAdd"
          path="proker"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :deletable="prokerManage"
        :editable="prokerManage"
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
