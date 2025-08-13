<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE } from "~/utils";
  import {
    bulanOptions,
    columns,
    getInitialFormData,
    schema,
  } from "./_constants";
  import type { Schema } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const prokerEdit = await authStore.hasPermission({ proker: ["create"] });
  constantStore.setTitle("Sekretariat / Proker");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
    bidang: "sekretariat",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/proker`, {
    query,
  });

  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/diskon`;
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
  }

  const selected = ref<Record<string, boolean>>({});
  async function clickDelete() {
    const selectedId = Object.keys(selected.value)
      .map(Number)
      .map((index) => data.value?.data[index]?.id);
    async function onDelete() {
      await $fetch(`${APIBASE}/proker`, {
        method: "DELETE",
        body: {
          id: selectedId,
        },
      });
      selected.value = {};
      await refresh();
    }
    openConfirmModal(onDelete);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
  }
</script>

<template>
  <Title>Sekretariat | Proker</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="(state.id ? 'Edit' : 'Tambah') + ' Proker'"
      class="min-w-4xl"
    >
      <template #body>
        <UForm
          id="proker-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Bidang" name="bidang">
            <UInput :model-value="state.bidang" disabled />
          </UFormField>
          <UFormField label="Minggu Ke" name="mingguKe">
            <UInput
              v-model="state.mingguKe"
              type="number"
              :disabled="isLoading || !prokerEdit"
            />
          </UFormField>
          <UFormField label="Bulan" name="bulan">
            <USelectMenu
              v-model="state.bulan"
              placeholder="Pilih bulan"
              :items="bulanOptions"
              :disabled="isLoading || !prokerEdit"
            />
          </UFormField>
          <UFormField label="Tahun" name="tahun">
            <UInput
              v-model="state.tahun"
              :disabled="isLoading || !prokerEdit"
            />
          </UFormField>
          <UFormField label="Peserta" name="peserta">
            <UInput
              v-model="state.peserta"
              :disabled="isLoading || !prokerEdit"
            />
          </UFormField>
          <UFormField label="Biaya" name="biaya">
            <UInput
              v-model="state.biaya"
              type="number"
              :disabled="isLoading || !prokerEdit"
            />
          </UFormField>
          <UFormField label="Kegiatan" name="kegiatan">
            <UTextarea
              v-model="state.kegiatan"
              :disabled="isLoading || !prokerEdit"
            />
          </UFormField>
          <UFormField label="Keterangan" name="keterangan">
            <UTextarea
              v-model="state.keterangan"
              :disabled="isLoading || !prokerEdit"
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
          Batal
        </UButton>
        <UButton
          type="submit"
          icon="i-heroicons-check-16-solid"
          :loading="isLoading"
          form="bootcamp-form"
        >
          Simpan
        </UButton>
      </template>
    </LazyUModal>
    <UCard>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row">
        <div class="flex gap-2">
          <UInput
            size="xl"
            class="flex-5"
            leading-icon="i-heroicons-magnifying-glass"
            placeholder="Search..."
            @update:model-value="searchDebounced"
          />
          <UButton
            icon="i-heroicons-plus"
            :disabled="isLoading"
            class="flex justify-center gap-2 text-xs text-white md:text-base dark:bg-blue-600"
            @click="clickAdd"
          >
            <p class="hidden md:block">Tambah</p>
          </UButton>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <UButton
            icon="i-heroicons-trash"
            color="error"
            class="gap-2 text-xs text-white disabled:opacity-50 md:text-base dark:bg-red-600"
            :disabled="isLoading"
            @click="clickDelete"
          >
            Hapus
          </UButton>
          <UButton
            icon="i-heroicons-arrow-up-tray"
            variant="subtle"
            class="gap-2 bg-green-700 text-xs text-white disabled:opacity-50 md:text-base"
            @click="json2Csv(data!.data)"
          >
            Ekspor
          </UButton>
        </div>
      </div>
      <AppTable
        v-model:page="query.page"
        v-model:select="selected"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        action
        selectable
        pagination
        @edit-click="clickUpdate"
      />
    </UCard>
  </main>
</template>
