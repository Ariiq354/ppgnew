<script setup lang="ts">
  const authStore = useAuthStore();
  const constantStore = useConstantStore();

  const modalOpen = ref(false);
  const items = [
    [
      {
        label: "Profil",
        icon: "i-heroicons-user",
        onSelect: () => {
          modalOpen.value = true;
        },
      },
      {
        label: "Keluar",
        icon: "i-heroicons-arrow-left-on-rectangle",
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
        class="hover:bg-primary cursor-pointer rounded-full bg-transparent p-2 text-black transition-all duration-300 hover:text-white dark:bg-transparent dark:text-white"
        aria-label="Sidebar toggle"
        @click="constantStore.toggleSidebar"
      >
        <UIcon name="i-heroicons-bars-3" class="h-7 w-7" />
      </UButton>
      <ClientOnly>
        <h1 class="font-semibold text-(--ui-text-muted)">
          {{ constantStore.topbarTitle }}
        </h1>
      </ClientOnly>
    </div>
    <div class="flex items-center gap-6">
      <ClientOnly>
        <UButton
          class="rounded-full p-2 text-black dark:text-white"
          variant="ghost"
          aria-label="Color mode toggle"
          @click="toggleColorMode"
        >
          <UIcon
            v-if="colorMode.value === 'dark'"
            name="i-heroicons-moon-solid"
            class="h-4 w-4"
          />
          <UIcon v-else name="i-heroicons-sun-solid" class="h-4 w-4" />
        </UButton>
      </ClientOnly>
      <UDropdownMenu :items="items">
        <div>
          <UAvatar icon="i-heroicons-photo" size="md" />
        </div>
      </UDropdownMenu>
    </div>
  </header>
</template>
