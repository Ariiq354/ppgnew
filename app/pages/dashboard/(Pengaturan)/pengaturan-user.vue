<script setup lang="ts">
  import UserContainer from "~/features/pengaturan/user/UserContainer.vue";
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Pengaturan / Daftar User");
</script>

<template>
  <Title>Pengaturan | Daftar User</Title>
  <main>
    <UserContainer />
  </main>
</template>
