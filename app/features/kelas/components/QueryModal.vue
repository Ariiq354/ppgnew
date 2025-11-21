<script setup lang="ts">
  import { bulanFilterOptions, tahunOptions } from "~~/shared/contants";
  import { kelasGenerusEnum } from "~~/shared/enum";
  import type { QueryType } from "../types";

  const openModel = defineModel<boolean>("open");

  const filterModel = defineModel<Omit<QueryType, "page" | "search">>("query");
</script>

<template>
  <UModal v-model:open="openModel" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <ClearableSelectMenu
          v-model="filterModel!.nama"
          placeholder="Kelas Pengajian"
          :items="[...kelasGenerusEnum]"
        />
        <ClearableSelectMenu
          v-model="filterModel!.tahun"
          placeholder="Tahun"
          :items="tahunOptions"
        />
        <ClearableSelectMenu
          v-model="filterModel!.bulan"
          placeholder="Bulan"
          :items="bulanFilterOptions"
          label-key="name"
          value-key="value"
        />
      </div>
    </template>
  </UModal>
</template>
