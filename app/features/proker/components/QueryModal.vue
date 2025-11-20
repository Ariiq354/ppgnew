<script setup lang="ts">
  import { bulanEnum } from "~~/shared/enum";
  import { tahunOptions, mingguOptions, bidangOptions } from "../constants";
  import type { QueryType } from "../types";

  const openModel = defineModel<boolean>("open");

  const filterModel = defineModel<Omit<QueryType, "page" | "search">>("query");
</script>

<template>
  <UModal v-model:open="openModel" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <ClearableSelectMenu
          v-model="filterModel!.bidang"
          placeholder="Bidang"
          :items="bidangOptions"
          value-key="value"
          label-key="name"
        />
        <ClearableSelectMenu
          v-model="filterModel!.tahun"
          placeholder="Tahun"
          :items="tahunOptions"
        />
        <ClearableSelectMenu
          v-model="filterModel!.bulan"
          placeholder="Bulan"
          :items="[...bulanEnum]"
        />
        <ClearableSelectMenu
          v-model="filterModel!.mingguKe"
          placeholder="Minggu"
          :items="mingguOptions"
        />
      </div>
    </template>
  </UModal>
</template>
