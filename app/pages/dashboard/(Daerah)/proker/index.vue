<script setup lang="ts">
  import {
    bulanOptions,
    columns,
    mingguOptions,
    tahunOptions,
  } from "./_constants";

  const constantStore = useConstantStore();

  onMounted(() => {
    constantStore.setTitle("Dashboard / Program Kerja");
  });

  const query = reactive({
    search: "",
    page: 1,
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
  <main>
    <UCard>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row">
        <ClearableSelectMenu
          placeholder="Bidang"
          class="flex-1"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          placeholder="Tahun"
          class="flex-1"
          :items="tahunOptions"
        />
        <ClearableSelectMenu
          placeholder="Bulan"
          class="flex-1"
          :items="bulanOptions"
        />
        <ClearableSelectMenu
          placeholder="Minggu"
          class="flex-1"
          :items="mingguOptions"
        />
        <UInput
          size="xl"
          class="flex-5"
          leading-icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
          @update:model-value="searchDebounced"
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
