<script setup lang="ts">
  import { columns } from "./_constants";

  const constantStore = useConstantStore();

  onMounted(() => {
    constantStore.setTitle("Pengaturan / Daftar Wilayah");
  });

  const initialProvinsi = [
    { id: "p1", name: "Jawa Barat" },
    { id: "p2", name: "Jawa Tengah" },
    { id: "p3", name: "Jawa Timur" },
    { id: "p4", name: "Sumatera Utara" },
    { id: "p5", name: "Sumatera Selatan" },
    { id: "p6", name: "Kalimantan Timur" },
    { id: "p7", name: "Sulawesi Selatan" },
    { id: "p8", name: "Bali" },
  ];
</script>

<template>
  <Title>Daftar Wilayah</Title>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <UCard v-for="(item, index) in [1, 2, 3]" :key="index">
      <div class="mb-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold">Provinsi</h1>
        <UButton size="xl" class="flex items-center">
          <UIcon name="i-heroicons-plus" />
          Add
        </UButton>
      </div>
      <UTable
        class="rounded-lg border border-(--ui-border-muted)"
        :columns="columns"
        :ui="{
          tr: 'hover:bg-elevated/50',
        }"
        :data="initialProvinsi"
      >
        <template #actions-header="{ column }">
          <div class="text-center">{{ column.columnDef.header }}</div>
        </template>
        <template #actions-cell="{}">
          <div class="flex justify-center gap-4">
            <UButton
              icon="i-heroicons-pencil"
              variant="ghost"
              class="rounded-full"
            />
            <UButton
              icon="i-heroicons-trash"
              variant="ghost"
              color="error"
              class="rounded-full"
            />
          </div>
        </template>
      </UTable>
      <div class="flex items-center justify-end space-x-4 py-4">
        <UButton variant="outline" size="xl">
          <UIcon name="i-heroicons-chevron-left" class="h-5 w-5" />
        </UButton>
        <div>Page 1 of 2</div>
        <UButton variant="outline" size="xl">
          <UIcon name="i-heroicons-chevron-right" class="h-5 w-5" />
        </UButton>
      </div>
    </UCard>
  </div>
</template>
