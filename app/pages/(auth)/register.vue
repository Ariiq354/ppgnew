<script setup lang="ts">
  import RegisterContainer from "~/features/auth/RegisterContainer.vue";

  definePageMeta({
    layout: "auth",
  });
</script>

<template>
  <Title>Daftar</Title>

  <main class="flex w-full items-center justify-center">
    <RegisterContainer />
  </main>
</template>
