<script setup lang="ts">
  useSeoMeta({
    description: "Keluarga Bahagia",
  });

  useHead({
    htmlAttrs: {
      lang: "id",
    },
  });
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-black">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator :height="5" />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
