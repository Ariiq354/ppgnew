<script setup lang="ts">
  import LoginContainer from "~/features/auth/LoginContainer.vue";

  definePageMeta({
    layout: "auth",
  });
</script>

<template>
  <Title>Masuk</Title>
  <main class="flex w-full items-center justify-center">
    <LoginContainer />
  </main>
</template>
