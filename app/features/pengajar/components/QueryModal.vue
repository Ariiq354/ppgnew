<script setup lang="ts">
  import { statusPengajarEnum } from "~~/shared/enum";

  const authStore = useAuthStore();

  const openModel = defineModel<boolean>("open");

  const filterModel = defineModel<{
    desaId?: number | undefined;
    kelompokId?: number | undefined;
    status?: string | undefined;
  }>("query");
</script>

<template>
  <UModal v-model:open="openModel" title="Filter">
    <template #body>
      <div class="flex flex-col gap-4">
        <InputDesa
          v-model="filterModel!.desaId"
          :daerah-id="authStore.user?.daerahId"
        />
        <InputKelompok
          v-model="filterModel!.kelompokId"
          :desa-id="filterModel!.desaId"
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
