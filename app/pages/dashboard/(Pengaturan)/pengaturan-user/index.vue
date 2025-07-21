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
  }, 300);
  const { data, status } = await useFetch(`${APIBASE}/user`, {
    query,
  });
</script>

<template>
  <Title>Pengaturan | Daftar User</Title>
  <main>
    <UCard>
      <div class="mb-4 flex justify-end">
        <UInput
          class="max-w-xs"
          size="xl"
          leading-icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
          @update:model-value="searchDebounced"
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
      />
    </UCard>
  </main>
</template>
