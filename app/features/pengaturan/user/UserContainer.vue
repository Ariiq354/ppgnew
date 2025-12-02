<script setup lang="ts">
  import { columns } from "./constants";
  import { APIBASE } from "~/utils";

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
  <UCard>
    <div class="mb-4 flex gap-2 md:mb-6 md:gap-4">
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
</template>
