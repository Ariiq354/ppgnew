<script setup lang="ts">
  import { columns, statusOptions } from "./_constants";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Tenaga Pengajar");

  const filterModal = ref(false);
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
  <LazyUModal v-model:open="filterModal" title="Filter" class="">
    <template #body>
      <div class="flex flex-col gap-4">
        <ClearableSelectMenu
          placeholder="Daerah"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          placeholder="Desa"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          placeholder="Kelompok"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          v-model="query.status"
          placeholder="Status"
          :items="statusOptions"
          label-key="name"
          value-key="value"
        />
      </div>
    </template>
  </LazyUModal>
  <main>
    <UCard>
      <div class="mb-6 flex gap-2 md:gap-4">
        <UInput
          size="xl"
          class="flex-5"
          leading-icon="i-heroicons-magnifying-glass"
          placeholder="Search..."
          @update:model-value="searchDebounced"
        />
        <ClearableSelectMenu
          placeholder="Daerah"
          class="hidden flex-1 md:flex"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          placeholder="Desa"
          class="hidden flex-1 md:flex"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          placeholder="Kelompok"
          class="hidden flex-1 md:flex"
          :items="['asd', 'dsa', 'sad']"
        />
        <ClearableSelectMenu
          v-model="query.status"
          placeholder="Status"
          class="hidden flex-1 md:flex"
          :items="statusOptions"
          label-key="name"
          value-key="value"
        />
        <UButton
          variant="subtle"
          icon="i-heroicons-funnel"
          class="flex md:hidden"
          @click="filterModal = true"
        />
      </div>
      <AppTable
        v-model:page="query.page"
        :columns="columns"
        :data="[
          { id: 1, nama: 'asd' },
          { id: 2, nama: 'dsa' },
        ]"
        :loading="status === 'pending'"
        :total="2"
        selectable
        editable
        viewable
        deletable
        enumerate
        pagination
        action
        @delete="(id) => console.log(id)"
      />
    </UCard>
  </main>
</template>
