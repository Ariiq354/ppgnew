<script setup lang="ts">
  import { columns, statusOptions } from "./_constants";

  const constantStore = useConstantStore();

  onMounted(() => {
    constantStore.setTitle("Dashboard / Tenaga Pengajar");
  });

  const query = reactive({
    search: "",
    page: 1,
    status: "",
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 500);
  const { status } = await useFetch(`${APIBASE}/home/pengajar`, {
    query,
  });
</script>

<template>
  <Title>Dashboard | Tenaga Pengajar</Title>
  <main>
    <UCard>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row">
        <ClearableSelectMenu
          placeholder="Daerah"
          class="flex-1"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          placeholder="Desa"
          class="flex-1"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          placeholder="Kelompok"
          class="flex-1"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          v-model="query.status"
          placeholder="Status"
          class="flex-1"
          :items="statusOptions"
          label-key="name"
          value-key="value"
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
