<script setup lang="ts">
  import * as XLSX from "xlsx";

  const {
    path,
    addFunction = () => {},
    addPermission = true,
  } = defineProps<{
    path: string;
    addPermission?: boolean;
    addFunction?: () => void;
  }>();

  async function export2xlsx() {
    const { data } = await useFetch<{
      data: object[];
    }>(path, {
      query: {
        page: 1,
        limit: 99999,
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
  <div class="flex gap-2 md:gap-4">
    <UButton
      v-if="addPermission"
      icon="ii-lucide-search-plus"
      class="text-white dark:bg-blue-600 hover:dark:bg-blue-600/75"
      @click="addFunction"
    >
      <p class="hidden md:block">Tambah</p>
    </UButton>
    <UButton
      icon="i-lucide-download"
      variant="subtle"
      class="bg-green-700 text-white hover:bg-green-700/75"
      @click="export2xlsx"
    >
      <p class="hidden md:block">Export</p>
    </UButton>
  </div>
</template>
