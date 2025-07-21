<script setup lang="ts">
  import * as XLSX from "xlsx";

  const {
    addButton = true,
    deleteButton = true,
    path,
    addFunction = () => {},
    deleteFunction = () => {},
  } = defineProps<{
    path: string;
    addButton?: boolean;
    isLoading?: boolean;
    deleteButton?: boolean;
    deleteDisabled?: boolean;
    exportDisabled?: boolean;
    addFunction?: () => void;
    deleteFunction?: () => void;
  }>();

  async function export2xlsx() {
    const { data } = await useFetch<{
      data: object[];
    }>(path, {
      query: {
        page: 1,
        limit: 10000,
      },
    });

    if (data.value) {
      const worksheet = XLSX.utils.json_to_sheet(data.value.data);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, "data.xlsx");
    }
  }
</script>

<template>
  <div
    class="border-accented mb-6 flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"
  >
    <div v-if="addButton || deleteButton" class="flex flex-wrap gap-2">
      <UButton
        v-if="addButton"
        icon="i-heroicons-plus"
        :disabled="isLoading"
        variant="soft"
        class="gap-2 text-xs text-black md:text-base dark:text-white"
        @click="addFunction"
      >
        Tambah
      </UButton>
      <UButton
        v-if="deleteButton"
        icon="i-heroicons-trash"
        variant="soft"
        class="gap-2 text-xs text-black disabled:opacity-50 md:text-base dark:text-white"
        :disabled="deleteDisabled || isLoading"
        @click="deleteFunction"
      >
        Hapus
      </UButton>
    </div>
    <div class="flex gap-2">
      <slot />
      <UButton
        icon="i-heroicons-arrow-up-tray"
        variant="soft"
        class="gap-2 text-xs text-black disabled:opacity-50 md:text-base dark:text-white"
        :disabled="exportDisabled"
        @click="export2xlsx"
      >
        Ekspor
      </UButton>
    </div>
  </div>
</template>
