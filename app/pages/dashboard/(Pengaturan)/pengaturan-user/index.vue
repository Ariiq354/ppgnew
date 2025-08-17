<script setup lang="ts">
  import { columns } from "./_constants";

  const constantStore = useConstantStore();

  onMounted(() => {
    constantStore.setTitle("Pengaturan / Daftar User");
  });

  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 500);
  const { data, status } = await useFetch(`${APIBASE}/user`, {
    query,
  });
</script>

<template>
  <Title>Pengaturan | Daftar User</Title>
  <main>
    <UCard>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row">
        <div class="flex-1">
          <UInput
            size="xl"
            leading-icon="i-lucide-search"
            placeholder="Search..."
            @update:model-value="searchDebounced"
          />
        </div>
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="data?.data"
        :loading="status === 'pending'"
        :total="data?.metadata.total"
        enumerate
        pagination
      />
    </UCard>
  </main>
</template>
