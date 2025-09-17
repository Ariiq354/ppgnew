<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns, kelasOptions, pengajianOptions } from "./_constants";
  import { useAuthStore } from "~/stores/auth";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  constantStore.setTitle("Dashboard / Generus");

  const filterModal = ref(false);
  const query = reactive({
    search: "",
    page: 1,
    kelasSekolah: "",
    kelasPengajian: "",
    desaId: "",
    kelompokId: "",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 500);
  const { data, status } = await useFetch(`${APIBASE}/home/generus`, {
    query,
  });

  const { data: dataDesa, status: statusDesa } = await useFetch(
    `${APIBASE}/options/desa`,
    {
      query: {
        daerahId: computed(() => authStore.user?.daerahId),
      },
      onResponse() {
        query.kelompokId = "";
      },
    }
  );
  const {
    data: datakelompok,
    status: statusKelompok,
    refresh,
  } = await useFetch(`${APIBASE}/options/kelompok`, {
    immediate: false,
    query: {
      desaId: computed(() => query.desaId),
    },
  });

  watchOnce(
    () => query.desaId,
    () => refresh()
  );

  watch(
    () => query.desaId,
    () => {
      query.kelompokId = "";
    }
  );

  watch(
    () => [
      query.kelasPengajian,
      query.kelompokId,
      query.kelasSekolah,
      query.desaId,
    ],
    () => {
      query.page = 1;
    }
  );

  const modalOpen = ref(false);
  const state = ref();
  function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = { ...itemData };
  }
</script>

<template>
  <Title>Dashboard | Generus</Title>
  <LazyUModal v-model:open="modalOpen" title="Detail Generus" class="max-w-4xl">
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
            <UInput v-model="state.status" disabled />
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
          v-model="query.desaId"
          placeholder="Desa"
          :items="dataDesa?.data"
          value-key="id"
          label-key="name"
          :loading="statusDesa === 'pending'"
        />
        <ClearableSelectMenu
          v-model="query.kelompokId"
          placeholder="Kelompok"
          :items="datakelompok?.data"
          value-key="id"
          label-key="name"
          :loading="statusKelompok === 'pending'"
        />
        <ClearableSelectMenu
          v-model="query.kelasSekolah"
          placeholder="Kelas Sekolah"
          :items="kelasOptions"
        />
        <ClearableSelectMenu
          v-model="query.kelasPengajian"
          placeholder="Kelas Pengajian"
          :items="pengajianOptions"
        />
      </div>
    </template>
  </LazyUModal>
  <main>
    <UCard>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row">
        <UInput
          class="flex-5"
          leading-icon="i-lucide-search"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
        <ClearableSelectMenu
          v-model="query.desaId"
          placeholder="Desa"
          class="hidden flex-1 md:flex"
          :items="dataDesa?.data"
          value-key="id"
          label-key="name"
          :loading="statusDesa === 'pending'"
        />
        <ClearableSelectMenu
          v-model="query.kelompokId"
          placeholder="Kelompok"
          class="hidden flex-1 md:flex"
          :items="datakelompok?.data"
          value-key="id"
          label-key="name"
          :loading="statusKelompok === 'pending'"
        />
        <ClearableSelectMenu
          v-model="query.kelasSekolah"
          placeholder="Kelas Sekolah"
          class="hidden flex-1 md:flex"
          :items="kelasOptions"
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
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        pagination
        viewable
        @view="(i) => clickUpdate(i)"
      />
    </UCard>
  </main>
</template>
