<script setup lang="ts">
  import { bulanEnum, statusProkerEnum } from "~~/shared/enum";
  import { schema, type Schema } from "../constants";
  import type { FormSubmitEvent } from "@nuxt/ui";

  const openModel = defineModel<boolean>("open");

  const state = defineModel<Schema>("state");

  defineProps<{
    isLoading: boolean;
    onSubmit: (event: FormSubmitEvent<Schema>) => Promise<void>;
  }>();
</script>

<template>
  <LazyUModal
    v-model:open="openModel"
    :title="(state!.id ? 'Edit' : 'Tambah') + ' Proker'"
    class="max-w-4xl"
  >
    <template #body>
      <UForm
        id="proker-form"
        :schema="schema"
        :state="state!"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Minggu Ke" name="mingguKe">
          <UInput
            v-model="state!.mingguKe"
            type="number"
            :disabled="isLoading"
          />
        </UFormField>
        <UFormField label="Bulan" name="bulan">
          <USelectMenu
            v-model="state!.bulan"
            placeholder="Pilih bulan"
            :items="[...bulanEnum]"
            :disabled="isLoading"
          />
        </UFormField>
        <UFormField label="Tahun" name="tahun">
          <UInput v-model="state!.tahun" :disabled="isLoading" type="number" />
        </UFormField>
        <UFormField label="Peserta" name="peserta">
          <UInput v-model="state!.peserta" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Biaya" name="biaya">
          <UInput v-model="state!.biaya" type="number" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Kegiatan" name="kegiatan">
          <UTextarea v-model="state!.kegiatan" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Keterangan" name="keterangan">
          <UTextarea v-model="state!.keterangan" :disabled="isLoading" />
        </UFormField>
        <UFormField label="Status" name="status">
          <USelectMenu
            v-model="state!.status"
            placeholder="Pilih status"
            :items="[...statusProkerEnum]"
            :disabled="isLoading"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton
        icon="i-lucide-x"
        variant="ghost"
        :disabled="isLoading"
        @click="openModel = false"
      >
        Batal
      </UButton>
      <UButton
        type="submit"
        icon="i-lucide-check"
        :loading="isLoading"
        form="proker-form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
</template>
