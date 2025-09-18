<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { useSubmit } from "~/composables/function";
  import { useToastError } from "~/composables/toast";
  import { useAuthStore } from "~/stores/auth";
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import type { Schema } from "./_constants";
  import {
    columns,
    getInitialFormData,
    schema,
    statusOptions,
  } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const bimbinganEdit = authStore.hasPermission({
    bimbingan_konseling: ["manage"],
  });
  constantStore.setTitle("Bimbingan & Konseling / Daftar Konseling");

  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(
    `${APIBASE}/konseling/daerah`,
    {
      query,
    }
  );

  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const basePath = `${APIBASE}/konseling/daerah`;
    await execute({
      path: `${basePath}/${state.value.id}`,
      body: event.data,
      method: "PUT",
      onSuccess() {
        modalOpen.value = false;
        refresh();
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value.id = itemData.id;
    state.value.generusId = itemData.generusId;
    state.value.status = itemData.status;
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
  <Title>Bimbingan & Konseling | Daftar Konseling</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="(viewStatus ? 'Detail' : 'Edit') + ' Konseling'"
      class="max-w-2xl"
    >
      <template #body>
        <UForm
          id="konseling-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Generus">
            <UInput
              :model-value="
                data?.data.find((i) => i.generusId === state.generusId)?.nama
              "
              disabled
            />
          </UFormField>
          <UFormField label="Gender">
            <UInput
              :model-value="
                data?.data.find((i) => i.generusId === state.generusId)?.gender
              "
              disabled
            />
          </UFormField>
          <UFormField label="Kelas Sekolah">
            <UInput
              :model-value="
                data?.data.find((i) => i.generusId === state.generusId)
                  ?.kelasSekolah
              "
              disabled
            />
          </UFormField>
          <UFormField label="Kelas Pengajian">
            <UInput
              :model-value="
                data?.data.find((i) => i.generusId === state.generusId)
                  ?.kelasPengajian
              "
              disabled
            />
          </UFormField>
          <UFormField label="Nama Ayah/Ibu">
            <UInput
              :model-value="
                data?.data.find((i) => i.generusId === state.generusId)
                  ?.namaOrtu
              "
              disabled
            />
          </UFormField>
          <UFormField label="No Telepon">
            <UInput
              :model-value="
                data?.data.find((i) => i.generusId === state.generusId)
                  ?.noTelepon
              "
              disabled
            />
          </UFormField>
          <UFormField label="No Telepon Ortu">
            <UInput
              :model-value="
                data?.data.find((i) => i.generusId === state.generusId)
                  ?.noTeleponOrtu
              "
              disabled
            />
          </UFormField>
          <UFormField label="Keterangan">
            <UInput
              :model-value="
                data?.data.find((i) => i.generusId === state.generusId)
                  ?.keterangan
              "
              disabled
            />
          </UFormField>
          <UFormField label="Status" name="status">
            <USelectMenu
              v-model="state.status"
              :disabled="isLoading || !bimbinganEdit || viewStatus"
              :items="statusOptions"
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
          form="konseling-form"
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
          :add-permission="false"
          path="konseling/daerah/export"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :editable="bimbinganEdit"
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
      />
    </UCard>
  </main>
</template>
