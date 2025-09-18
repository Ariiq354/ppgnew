<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import {
    columns,
    genderOptions,
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
  const pengajarEdit = authStore.hasPermission({
    pjp_kelompok: ["manage"],
  });
  constantStore.setTitle("PJP Kelompok / Pengajar");

  const filterModal = ref(false);
  const state = ref(getInitialFormData());
  const query = reactive({
    search: "",
    status: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status, refresh } = await useFetch(`${APIBASE}/pengajar`, {
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
      formData.append(key, value);
    }

    const basePath = `${APIBASE}/pengajar`;
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
    openConfirmModal("/pengajar", { id: ids }, refresh);
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
  <Title>PJP Kelompok | Pengajar</Title>
  <main>
    <LazyUModal
      v-model:open="modalOpen"
      :title="
        (state.id ? (viewStatus ? 'Detail' : 'Edit') : 'Tambah') + ' Pengajar'
      "
      class="max-w-4xl"
    >
      <template #body>
        <UForm
          id="pengajar-form"
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
              :disabled="isLoading || !pengajarEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Nama" name="nama">
            <UInput
              v-model="state.nama"
              :disabled="isLoading || !pengajarEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Jenis Kelamin" name="gender">
            <USelectMenu
              v-model="state.gender"
              :disabled="isLoading || !pengajarEdit || viewStatus"
              :items="genderOptions"
            />
          </UFormField>
          <UFormField label="No. Telepon" name="noTelepon">
            <UInput
              v-model="state.noTelepon"
              :disabled="isLoading || !pengajarEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Pendidikan Terakhir" name="pendidikan">
            <UInput
              v-model="state.pendidikan"
              :disabled="isLoading || !pengajarEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Status" name="status">
            <USelectMenu
              v-model="state.status"
              :disabled="isLoading || !pengajarEdit || viewStatus"
              :items="statusOptions"
            />
          </UFormField>
          <UFormField label="Tempat Lahir" name="tempatLahir">
            <UInput
              v-model="state.tempatLahir"
              :disabled="isLoading || !pengajarEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Tanggal Lahir" name="tanggalLahir">
            <UInput
              v-model="state.tanggalLahir"
              type="date"
              :disabled="isLoading || !pengajarEdit || viewStatus"
            />
          </UFormField>
          <UFormField label="Tanggal Mulai Tugas Awal" name="tanggalTugas">
            <UInput
              v-model="state.tanggalTugas"
              type="date"
              :disabled="isLoading || !pengajarEdit || viewStatus"
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
          form="pengajar-form"
        >
          Simpan
        </UButton>
      </template>
    </LazyUModal>
    <LazyUModal v-model:open="filterModal" title="Filter">
      <template #body>
        <div class="flex flex-col gap-4">
          <ClearableSelectMenu
            v-model="query.status"
            placeholder="Status"
            :items="statusOptions"
          />
        </div>
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
        <ClearableSelectMenu
          v-model="query.status"
          placeholder="Status"
          class="hidden flex-1 md:flex"
          :items="statusOptions"
        />
        <UButton
          variant="subtle"
          icon="i-lucide-filter"
          class="md:hidden"
          @click="filterModal = true"
        />
        <AppTambahExport
          :add-permission="pengajarEdit"
          :add-function="clickAdd"
          path="pengajar"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        :deletable="pengajarEdit"
        :editable="pengajarEdit"
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
