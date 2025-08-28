<script setup lang="ts">
  import { useAuthStore } from "~/stores/auth";
  import { useConstantStore } from "~/stores/constant";

  const authStore = useAuthStore();
  const constantStore = useConstantStore();

  const modalOpen = ref(false);
  const items = [
    [
      {
        label: "Profil",
        icon: "i-lucide-user",
        onSelect: () => {
          modalOpen.value = true;
        },
      },
      {
        label: "Keluar",
        icon: "i-lucide-log-out",
        onSelect: async () => {
          await authStore.signOut();
        },
      },
    ],
  ];

  const colorMode = useColorMode();

  function toggleColorMode() {
    if (colorMode.value === "dark") {
      colorMode.preference = "light";
    } else {
      colorMode.preference = "dark";
    }
  }
</script>

<template>
  <ModalProfile v-model="modalOpen" />
  <header class="mb-8 flex justify-between">
    <div class="flex items-center gap-8">
      <UButton
        icon="i-lucide-menu"
        class="hover:bg-primary cursor-pointer rounded-full bg-transparent p-2 text-black transition-all duration-300 hover:text-white dark:bg-transparent dark:text-white"
        aria-label="Sidebar toggle"
        @click="constantStore.toggleSidebar"
      />
      <ClientOnly>
        <h1 class="font-semibold text-(--ui-text-muted)">
          {{ constantStore.topbarTitle }}
        </h1>
      </ClientOnly>
    </div>
    <div class="flex items-center gap-2">
      <ClientOnly>
        <UButton
          :icon="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
          class="rounded-full p-2"
          variant="ghost"
          color="neutral"
          aria-label="Color mode toggle"
          @click="toggleColorMode"
        />
      </ClientOnly>
      <UDropdownMenu :items="items">
        <UButton
          icon="i-lucide-circle-user"
          class="rounded-full"
          color="neutral"
          variant="ghost"
        />
      </UDropdownMenu>
    </div>
  </header>
</template>
