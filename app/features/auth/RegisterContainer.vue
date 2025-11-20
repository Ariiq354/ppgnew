<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import {
    initFormDataRegister,
    registerSchema,
    type RegisterSchema,
  } from "./contants";
  import ResultModal from "./components/ResultModal.vue";

  const authStore = useAuthStore();

  const modalOpen = ref(false);

  const state = ref(initFormDataRegister);

  const result = ref();

  async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
    const res = await authStore.signUp(event.data);

    if (res) {
      result.value = res;
      modalOpen.value = true;
    }
  }
</script>

<template>
  <ResultModal v-model:open="modalOpen" :result="result" />
  <UCard class="w-full max-w-md">
    <div class="space-y-6">
      <div class="flex flex-col items-center text-center">
        <NuxtImg src="/ppg.webp" width="200" height="200" alt="logo ppg" />
        <div class="text-highlighted text-2xl font-bold">Daftar akun</div>
        <div class="text-muted mt-1">
          Sudah punya akun?
          <NuxtLink to="/" class="text-primary font-medium"> Masuk. </NuxtLink>
        </div>
      </div>
      <UForm
        :schema="registerSchema"
        :state="state"
        class="w-full space-y-6"
        @submit="onSubmit"
      >
        <UFormField label="Nama Daerah" name="daerah">
          <UInput v-model="state.daerah" placeholder="Masukkan nama daerah" />
        </UFormField>

        <UFormField
          label="Singkatan Nama Daerah (akan dijadikan username login)"
          name="daerah"
        >
          <UInput
            v-model="state.daerah"
            placeholder="Masukkan singkatan Daerah (huruf kecil)"
          />
        </UFormField>
        <p class="text-muted text-sm">
          Contoh: <br />
          Nama Daerah: Bogor Selatan 2 <br />
          Singkatan Nama Daerah: bs2 <br />
          Username Bidang Sekretariat: sekretariat.bs2
        </p>

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
</template>
