<script setup lang="ts">
  import { statusPengajarEnum } from "~~/shared/enum";
  import type { QueryTypeDesa } from "../types";

  const authStore = useAuthStore();

  const openModel = defineModel<boolean>("open");

  const filterModel =
    defineModel<Omit<QueryTypeDesa, "page" | "search">>("query");
</script>

<template>
  <UModal v-model:open="openModel" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <InputKelompok
          v-model="filterModel!.kelompokId"
          :desa-id="authStore.user?.desaId"
        />
        <ClearableSelectMenu
          v-model="filterModel!.status"
          placeholder="Status"
          :items="[...statusPengajarEnum]"
        />
      </div>
    </template>
  </UModal>
</template>
