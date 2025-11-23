<script setup lang="ts">
  import { statusPengajarEnum } from "~~/shared/enum";
  import type { QueryTypeKelompok } from "../types";

  const openModel = defineModel<boolean>("open");

  const filterModel =
    defineModel<Omit<QueryTypeKelompok, "page" | "search">>("query");
</script>

<template>
  <UModal v-model:open="openModel" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <ClearableSelectMenu
          v-model="filterModel!.status"
          placeholder="Status"
          :items="[...statusPengajarEnum]"
        />
      </div>
    </template>
  </UModal>
</template>
