<script setup lang="ts">
  import { z } from "zod/mini";
  import type { FormSubmitEvent } from "#ui/types";
  import { useAuthStore } from "~/stores/auth";

  const authStore = useAuthStore();

  const modalOpen = defineModel<boolean>();
  const schema = z.object({
    daerahId: z.number(),
    desaId: z.number(),
    kelompokId: z.number(),
  });
  const initialFormData = (): Partial<Schema> => ({
    daerahId: undefined,
    desaId: undefined,
    kelompokId: undefined,
  });
  const state = ref(initialFormData());

  whenever(modalOpen, () => {
    state.value = initialFormData();
  });

  type Schema = z.infer<typeof schema>;

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await authStore.updateWilayah(event.data);
  }

  const { data: dataDaerah } = await useFetch(`${APIBASE}/options/daerah`);
  watch(
    () => state.value.daerahId,
    () => {
      state.value.kelompokId = undefined;
      state.value.desaId = undefined;
    }
  );

  const {
    data: dataDesa,
    status: statusDesa,
    refresh: rDesa,
  } = await useFetch(`${APIBASE}/options/desa`, {
    immediate: false,
    query: {
      daerahId: computed(() => state.value.daerahId),
    },
  });
  watchOnce(
    () => state.value.daerahId,
    () => rDesa()
  );
  watch(
    () => state.value.desaId,
    () => {
      state.value.kelompokId = undefined;
    }
  );

  const {
    data: datakelompok,
    status: statusKelompok,
    refresh: rKelompok,
  } = await useFetch(`${APIBASE}/options/kelompok`, {
    immediate: false,
    query: {
      desaId: computed(() => state.value.desaId),
    },
  });
  watchOnce(
    () => state.value.desaId,
    () => rKelompok()
  );
</script>

<template>
  <UModal
    v-model:open="modalOpen"
    title="Ganti Wilayah"
    description="Form mengganti Wilayah"
  >
    <template #body>
      <UForm
        id="modal-wilayah"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex flex-col gap-4">
          <UFormField label="Daerah" name="daerahId">
            <ClearableSelectMenu
              v-model="state.daerahId"
              placeholder="Daerah"
              :items="dataDaerah?.data"
              value-key="id"
              label-key="name"
              :disabled="authStore.loading"
            />
          </UFormField>
          <UFormField label="Desa" name="desaId">
            <ClearableSelectMenu
              v-model="state.desaId"
              placeholder="Desa"
              :items="dataDesa?.data"
              value-key="id"
              label-key="name"
              :loading="statusDesa === 'pending'"
              :disabled="authStore.loading"
            />
          </UFormField>
          <UFormField label="Kelompok" name="kelompokId">
            <ClearableSelectMenu
              v-model="state.kelompokId"
              placeholder="Kelompok"
              :items="datakelompok?.data"
              value-key="id"
              label-key="name"
              :loading="statusKelompok === 'pending'"
              :disabled="authStore.loading"
            />
          </UFormField>
        </div>
      </UForm>
    </template>
    <template #footer>
      <UButton
        icon="i-lucide-x"
        variant="ghost"
        :disabled="authStore.loading"
        @click="modalOpen = false"
      >
        Batal
      </UButton>
      <UButton
        type="submit"
        form="modal-wilayah"
        icon="i-lucide-check"
        :loading="authStore.loading"
      >
        Simpan
      </UButton>
    </template>
  </UModal>
</template>
