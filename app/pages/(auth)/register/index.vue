<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { useAuthStore } from "~/stores/auth";
  import type { Schema } from "./_constants";
  import { initFormData, schema } from "./_constants";

  definePageMeta({
    layout: "auth",
  });

  const authStore = useAuthStore();

  const modalOpen = ref(false);

  const state = ref(initFormData);

  const result = ref();

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const res = await authStore.signUp(event.data);

    if (res) {
      result.value = res;
      modalOpen.value = true;
    }
  }
</script>

<template>
  <Title>Daftar Akun</Title>
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
  <main class="flex w-full items-center justify-center">
    <UCard class="w-full max-w-md">
      <div class="space-y-6">
        <div class="flex flex-col items-center text-center">
          <NuxtImg src="/ppg.webp" width="200" height="200" alt="logo ppg" />
          <div class="text-2xl font-bold text-(--ui-text-highlighted)">
            Daftar akun
          </div>
          <div class="text-muted mt-1">
            Sudah punya akun?
            <NuxtLink to="/" class="text-primary font-medium">
              Masuk.
            </NuxtLink>
          </div>
        </div>
        <UForm
          :schema="schema"
          :state="state"
          class="w-full space-y-6"
          @submit="onSubmit"
        >
          <UFormField label="Nama Daerah" name="daerah">
            <UInput v-model="state.daerah" placeholder="Masukkan nama daerah" />
          </UFormField>

          <UButton
            class="flex w-full justify-center"
            type="submit"
            :loading="authStore.loading"
          >
            Buat Akun
          </UButton>
        </UForm>
      </div>
    </UCard>
  </main>
</template>
