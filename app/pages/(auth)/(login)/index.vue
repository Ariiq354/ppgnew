<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { initFormData, schema } from "./_constants";
  import type { Schema } from "./_constants";
  import { useAuthStore } from "~/stores/auth";

  definePageMeta({
    layout: "auth",
  });

  const authStore = useAuthStore();

  const state = reactive(initFormData);

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
          <div class="text-highlighted text-2xl font-bold">Assalamualaikum</div>
          <div class="text-muted mt-1">
            Belum punya akun?
            <NuxtLink to="/register" class="text-primary font-medium">
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
              :disabled="authStore.loading"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <InputPassword
              v-model="state.password"
              :disabled="authStore.loading"
              placeholder="Masukkan password anda"
            />
          </UFormField>

          <UCheckbox
            v-model="state.rememberMe"
            label="Ingat saya"
            :disabled="authStore.loading"
          />

          <UButton
            class="flex w-full justify-center"
            type="submit"
            :loading="authStore.loading"
          >
            Lanjut
          </UButton>
        </UForm>
      </div>
    </UCard>
  </main>
</template>
