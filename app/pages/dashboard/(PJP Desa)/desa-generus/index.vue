<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns, pengajianOptions } from "./_constants";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("PJP Desa / Generus");

  const filterModal = ref(false);
  const state = ref();
  const query = reactive({
    search: "",
    kelasPengajian: "",
    kelompokId: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(`${APIBASE}/generus/desa`, {
    query,
  });

  const { data: datakelompok } = await useFetch(`${APIBASE}/options/kelompok`, {
    query: {
      desaId: authStore.user?.desaId,
    },
  });

  const modalOpen = ref(false);

  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = { ...itemData };
  }

  watch(
    () => [query.search, query.kelasPengajian, query.kelompokId],
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
      title="Detail Generus"
      class="max-w-4xl"
    >
      <template #body>
        <div class="space-y-4">
          <UFormField label="Foto Diri">
            <AppUploadImage v-model:foto="state.foto" disabled />
          </UFormField>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <UFormField label="Nama">
              <UInput v-model="state.nama" disabled />
            </UFormField>
            <UFormField label="Jenis Kelamin">
              <UInput v-model="state.gender" disabled />
            </UFormField>
            <UFormField label="Tempat Lahir">
              <UInput v-model="state.tempatLahir" disabled />
            </UFormField>
            <UFormField label="Tanggal Lahir">
              <UInput v-model="state.tanggalLahir" type="date" disabled />
            </UFormField>
            <UFormField label="No Telepon">
              <UInput v-model="state.noTelepon" disabled />
            </UFormField>
            <UFormField label="Nama Ayah/Ibu">
              <UInput v-model="state.namaOrtu" disabled />
            </UFormField>
            <UFormField label="No Telepon Ayah/Ibu">
              <UInput v-model="state.noTeleponOrtu" disabled />
            </UFormField>
            <UFormField label="Kelas Sekolah">
              <UInput v-model="state.kelasSekolah" disabled />
            </UFormField>
            <UFormField label="Kelas Pengajian">
              <UInput v-model="state.kelasPengajian" disabled />
            </UFormField>
            <UFormField label="Status">
              <USelectMenu v-model="state.status" multiple disabled />
            </UFormField>
          </div>
        </div>
      </template>
      <template #footer>
        <UButton icon="i-lucide-x" variant="ghost" @click="modalOpen = false">
          Tutup
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
          <ClearableSelectMenu
            v-model="query.kelompokId"
            placeholder="Kelompok"
            :items="datakelompok?.data"
            value-key="id"
            label-key="name"
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
        <ClearableSelectMenu
          v-model="query.kelompokId"
          placeholder="Kelompok"
          class="hidden flex-1 md:flex"
          :items="datakelompok?.data"
          value-key="id"
          label-key="name"
        />
        <UButton
          variant="subtle"
          icon="i-lucide-filter"
          class="md:hidden"
          @click="filterModal = true"
        />
        <AppTambahExport path="generus/export/desa" />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        viewable
        pagination
        @view="
          (i) => {
            clickUpdate(i);
          }
        "
      />
    </UCard>
  </main>
</template>
