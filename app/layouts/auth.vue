<script setup lang="ts">
  const authStore = useAuthStore();
  await authStore.init();
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <slot />
  </div>
</template>
