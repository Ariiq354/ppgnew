<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { initFormDataLogin, loginSchema, type LoginSchema } from "./contants";

  const authStore = useAuthStore();

  const state = reactive(initFormDataLogin);

  async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
    await authStore.signIn(event.data);
  }
</script>

<template>
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
        :schema="loginSchema"
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
</template>
