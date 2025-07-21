<script setup lang="ts">
  const constantStore = useConstantStore();
</script>

<template>
  <section class="flex">
    <AppSidebar />
    <div
      class="flex flex-1 flex-col overflow-auto p-4 transition-all duration-200 md:p-8"
      :class="{ 'md:ml-72': constantStore.sidebarShow }"
    >
      <AppTopbar />
      <slot />
    </div>
  </section>
</template>
