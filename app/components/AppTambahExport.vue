<script setup lang="ts">
  import { APIBASE } from "~/utils";

  const {
    path,
    addFunction = () => {},
    addPermission = false,
  } = defineProps<{
    path: string;
    addPermission?: boolean;
    addFunction?: () => void;
  }>();
</script>

<template>
  <div class="flex gap-2 md:gap-4">
    <UButton
      v-if="addPermission"
      icon="i-lucide-plus"
      class="text-white dark:bg-blue-600 hover:dark:bg-blue-600/75"
      @click="addFunction"
    >
      <p class="hidden md:block">Tambah</p>
    </UButton>
    <UButton
      :href="`${APIBASE}/${path}`"
      rel="noopener"
      :external="true"
      icon="i-lucide-download"
      class="bg-green-700 text-white hover:bg-green-700/75 active:bg-green-700/75"
    >
      <p class="hidden md:block">Export</p>
    </UButton>
  </div>
</template>
