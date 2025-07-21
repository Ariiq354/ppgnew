<script setup lang="ts">
  import type { NavigationMenuItem } from "@nuxt/ui";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const sidebarItems: NavigationMenuItem[] | NavigationMenuItem[][] = [
    [
      {
        label: "Daerah",
        type: "label",
      },
      {
        label: "Home Dashboard",
        to: "/dashboard",
        icon: "i-heroicons-home",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
      {
        label: "Tenaga Pengajar",
        icon: "i-heroicons-users",
        to: "/dashboard/data-pengajar",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
      {
        label: "Generus",
        icon: "i-heroicons-user-group",
        children: [
          {
            label: "Generus",
            to: "/dashboard/data-generus",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Kelas 6 & 9",
            to: "/dashboard/data-sd-smp",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
        ],
      },
      {
        label: "Program Kerja",
        icon: "i-heroicons-clipboard-document-check",
        to: "/dashboard/data-proker",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
    ],
    [
      {
        label: "Pengaturan",
        type: "label",
      },
      {
        label: "Daftar Wilayah",
        icon: "i-heroicons-map",
        to: "/dashboard/pengaturan-wilayah",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
      {
        label: "Dokumen",
        icon: "i-heroicons-document-text",
        to: "/dashboard/pengaturan-dokumen",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
      ...((await authStore.hasPermission({ menu: ["user"] }))
        ? [
            {
              label: "Daftar User",
              icon: "i-heroicons-user",
              to: "/dashboard/pengaturan-user",
              onSelect: () => {
                if (!isDesktop.value) {
                  constantStore.toggleSidebar();
                }
              },
            },
          ]
        : []),
    ],
  ];
</script>

<template>
  <aside
    class="fixed top-0 z-20 hidden h-full w-72 overflow-auto border-r border-gray-200 bg-white shadow-xl transition-all duration-200 md:block dark:border-gray-700 dark:bg-gray-900"
    :class="constantStore.sidebarShow ? 'left-0' : '-left-72'"
  >
    <div class="flex items-center justify-center pt-8 pb-6 text-(--ui-primary)">
      <div class="flex items-center text-2xl tracking-widest">
        <NuxtImg src="/ppg.webp" class="h-14 w-14" />
        <span>PPG</span>
      </div>
    </div>
    <ClientOnly>
      <UNavigationMenu
        orientation="vertical"
        :items="sidebarItems"
        class="w-full"
        :ui="{
          label: 'text-sm uppercase text-(--ui-primary) mb-2',
          link: 'text-base py-2',
          root: 'px-4',
          separator: 'h-0',
        }"
      />
    </ClientOnly>
  </aside>
  <ClientOnly>
    <USlideover
      v-if="!isDesktop"
      v-model:open="constantStore.sidebarShow"
      side="left"
      title="Menu"
    >
      <template #body>
        <aside class="overflow-auto">
          <UNavigationMenu
            orientation="vertical"
            :items="sidebarItems"
            class="w-full"
            :ui="{
              label: 'text-sm uppercase text-(--ui-primary) mb-2',
              link: 'text-base py-2',
              separator: 'h-0',
            }"
          />
        </aside>
      </template>
    </USlideover>
  </ClientOnly>
</template>
