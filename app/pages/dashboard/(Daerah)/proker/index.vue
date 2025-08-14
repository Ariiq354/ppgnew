<script setup lang="ts">
  import {
    bulanOptions,
    columns,
    mingguOptions,
    tahunOptions,
    bidangOptions,
  } from "./_constants";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Program Kerja");

  const filterModal = ref(false);
  const query = reactive({
    search: "",
    page: 1,
    bulan: "",
    tahun: "",
    minggu: "",
    bidang: "",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 500);
  const { status } = await useFetch(`${APIBASE}/home/pengajar`, {
    query,
  });
</script>

<template>
  <Title>Dashboard | Program Kerja</Title>
  <LazyUModal v-model:open="filterModal" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <ClearableSelectMenu
          v-model="query.bidang"
          placeholder="Bidang"
          :items="bidangOptions"
          value-key="value"
          label-key="name"
        />
        <ClearableSelectMenu
          v-model="query.tahun"
          placeholder="Tahun"
          :items="tahunOptions"
        />
        <ClearableSelectMenu
          v-model="query.bulan"
          placeholder="Bulan"
          :items="bulanOptions"
        />
        <ClearableSelectMenu
          v-model="query.minggu"
          placeholder="Minggu"
          :items="mingguOptions"
        />
      </div>
    </template>
  </LazyUModal>
  <main>
    <UCard>
      <div class="mb-6 flex gap-2 md:gap-4">
        <UInput
          class="flex-5"
          leading-icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
        <ClearableSelectMenu
          v-model="query.bidang"
          placeholder="Bidang"
          class="hidden flex-1 md:flex"
          :items="bidangOptions"
          value-key="value"
          label-key="name"
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
          :items="bulanOptions"
        />
        <ClearableSelectMenu
          v-model="query.minggu"
          placeholder="Minggu"
          class="hidden flex-1 md:flex"
          :items="mingguOptions"
        />
        <UButton
          variant="subtle"
          icon="i-heroicons-funnel"
          class="md:hidden"
          @click="filterModal = true"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="[]"
        :loading="status === 'pending'"
        :total="0"
        enumerate
        pagination
        action
      />
    </UCard>
  </main>
</template>
