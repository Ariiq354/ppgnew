<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import {
    columns,
    genderOptions,
    getInitialFormData,
    kelasOptions,
    pengajianOptions,
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
  const generusEdit = authStore.hasPermission({
    pjp_kelompok: ["manage"],
  });
  constantStore.setTitle("PJP Kelompok / Generus");

  const filterModal = ref(false);
  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    kelasPengajian: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/generus`, {
    query,
  });

  const viewStatus = ref(false);
  const modalOpen = ref(false);
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(
      event.data as Record<string, any>
    )) {
      if (Array.isArray(value)) {
        formData.append(`${key}[]`, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }

    const basePath = `${APIBASE}/generus`;
    await execute({
      path: state.value.id ? `${basePath}/${state.value.id}` : basePath,
      body: formData,
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
    openConfirmModal("/generus", { id: ids }, refresh);
  }

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = { ...itemData };
    viewStatus.value = false;
  }

  watch(
    () => [query.search, query.kelasPengajian],
    () => {
      query.page = 1;
    }
  );
</script>

<template>
  <Title>PJP Kelompok | Generus</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="
        (state.id ? (viewStatus ? 'Detail' : 'Edit') : 'Tambah') + ' Generus'
      "
      class="max-w-4xl"
    >
      <template #body>
        <UForm
          id="generus-form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          accept="image/png,image/jpeg,image/webp"
          @submit="onSubmit"
        >
          <UFormField label="Foto Diri" name="foto">
            <AppUploadImage
              v-model:file="state.file"
              v-model:foto="state.foto"
              :disabled="isLoading || !generusEdit || viewStatus"
            />
          </UFormField>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <UFormField label="Nama" name="nama">
              <UInput
                v-model="state.nama"
                :disabled="isLoading || !generusEdit || viewStatus"
              />
            </UFormField>
            <UFormField label="Jenis Kelamin" name="gender">
              <USelectMenu
                v-model="state.gender"
                :disabled="isLoading || !generusEdit || viewStatus"
                :items="genderOptions"
              />
            </UFormField>
            <UFormField label="Tempat Lahir" name="tempatLahir">
              <UInput
                v-model="state.tempatLahir"
                :disabled="isLoading || !generusEdit || viewStatus"
              />
            </UFormField>
            <UFormField label="Tanggal Lahir" name="tanggalLahir">
              <UInput
                v-model="state.tanggalLahir"
                type="date"
                :disabled="isLoading || !generusEdit || viewStatus"
              />
            </UFormField>
            <UFormField label="No Telepon" name="noTelepon">
              <UInput
                v-model="state.noTelepon"
                :disabled="isLoading || !generusEdit || viewStatus"
              />
            </UFormField>
            <UFormField label="Nama Ayah/Ibu" name="namaOrtu">
              <UInput
                v-model="state.namaOrtu"
                :disabled="isLoading || !generusEdit || viewStatus"
              />
            </UFormField>
            <UFormField label="No Telepon Ayah/Ibu" name="noTeleponOrtu">
              <UInput
                v-model="state.noTeleponOrtu"
                :disabled="isLoading || !generusEdit || viewStatus"
              />
            </UFormField>
            <UFormField label="Kelas Sekolah" name="kelasSekolah">
              <USelectMenu
                v-model="state.kelasSekolah"
                :disabled="isLoading || !generusEdit || viewStatus"
                :items="kelasOptions"
              />
            </UFormField>
            <UFormField label="Kelas Pengajian" name="kelasPengajian">
              <USelectMenu
                v-model="state.kelasPengajian"
                :disabled="isLoading || !generusEdit || viewStatus"
                :items="pengajianOptions"
              />
            </UFormField>
            <UFormField label="Status" name="status">
              <USelectMenu
                v-model="state.status"
                multiple
                :disabled="isLoading || !generusEdit || viewStatus"
                :items="statusOptions"
              />
            </UFormField>
          </div>
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
          form="generus-form"
        >
          Simpan
        </UButton>
      </template>
    </LazyUModal>
    <LazyUModal v-model:open="filterModal" title="Filter">
      <template #body>
        <div class="flex flex-col gap-4">
          <ClearableSelectMenu
            v-model="query.kelasPengajian"
            placeholder="Kelas Pengajian"
            :items="pengajianOptions"
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
          v-model="query.kelasPengajian"
          placeholder="Kelas Pengajian"
          class="hidden flex-1 md:flex"
          :items="pengajianOptions"
        />
        <UButton
          variant="subtle"
          icon="i-lucide-filter"
          class="md:hidden"
          @click="filterModal = true"
        />
        <AppTambahExport
          :add-permission="generusEdit"
          :add-function="clickAdd"
          path="generus/export"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :deletable="generusEdit"
        :editable="generusEdit"
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
