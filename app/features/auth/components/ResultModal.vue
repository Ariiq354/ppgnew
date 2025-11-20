<script setup lang="ts">
  defineProps<{
    result?: {
      username: string;
      password: string;
    };
  }>();

  const modalOpen = defineModel<boolean>("open");
</script>

<template>
  <UModal v-model:open="modalOpen" :dismissible="false">
    <template #content>
      <div class="flex flex-col items-center px-4 py-5">
        <UIcon
          name="i-lucide-circle-check"
          size="200"
          class="text-primary-500 dark:text-primary-400"
        />
        <h1 class="mb-2 text-3xl">Akun anda sudah terbuat</h1>
        <p v-if="result">Username: {{ result.username }}</p>
        <p v-if="result">Password: {{ result.password }}</p>
        <p class="mt-2 mb-4 text-sm opacity-60">
          *Anda dapat menggubah kredensial saat sudah masuk
        </p>

        <UButton to="/">Kembali ke laman masuk</UButton>
      </div>
    </template>
  </UModal>
</template>
