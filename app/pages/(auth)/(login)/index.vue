<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { getInitialFormData } from "../register/_constants";
  import { schema } from "./_constants";
  import type { Schema } from "zod/v3";

  definePageMeta({
    layout: "auth",
  });

  const authStore = useAuthStore();

  const state = ref(getInitialFormData());

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await authStore.signIn(event.data);
  }
</script>

<template>
  <Title>Masuk</Title>
  <main class="flex w-full items-center justify-center">
    <UCard class="w-full max-w-md">
      <div class="space-y-6">
        <div class="flex flex-col items-center text-center">
          <NuxtImg src="/ppg.webp" width="200" height="200" alt="logo ppg" />
          <div class="text-2xl font-bold text-(--ui-text-highlighted)">
            Assalamualaikum
          </div>
          <div class="mt-1 text-(--ui-text-muted)">
            Belum punya akun?
            <NuxtLink to="/register" class="font-medium text-(--ui-primary)">
              Daftar.
            </NuxtLink>
          </div>
        </div>
        <UForm
          :schema="schema"
          :state="state"
          class="w-full space-y-6"
          @submit="onSubmit"
        >
          <UFormField label="Username" name="username">
            <UInput
              v-model="state.username"
              placeholder="Masukkan username anda"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Masukkan kata sandi anda"
            />
          </UFormField>

          <UCheckbox v-model="state.rememberMe" label="Ingat saya" />

          <UButton
            class="flex w-full justify-center"
            type="submit"
            :loading="isLoading"
          >
            Lanjut
          </UButton>
        </UForm>
      </div>
    </UCard>
  </main>
</template>
