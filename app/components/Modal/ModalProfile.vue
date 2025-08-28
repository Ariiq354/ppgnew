<script setup lang="ts">
  import { z } from "zod/mini";
  import type { FormSubmitEvent } from "#ui/types";
  import { useAuthStore } from "~/stores/auth";

  const authStore = useAuthStore();

  const modalOpen = defineModel<boolean>();
  const schema = z.object({
    currentPassword: z.string().check(z.minLength(1, "Required")),
    newPassword: z.string().check(z.minLength(1, "Required")),
  });
  const initialFormData = (): Schema => ({
    currentPassword: "",
    newPassword: "",
  });
  const state = ref(initialFormData());

  whenever(modalOpen, () => {
    state.value = initialFormData();
  });

  type Schema = z.infer<typeof schema>;

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await authStore.updatePassword(
      event.data.newPassword,
      event.data.currentPassword
    );
  }
</script>

<template>
  <UModal
    v-model:open="modalOpen"
    title="Ganti Password"
    description="Form mengganti Password"
  >
    <template #body>
      <UForm
        id="modal-profile"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex gap-4">
          <div class="flex w-full flex-col gap-4">
            <UFormField label="Email">
              <UInput :model-value="authStore.user?.email" disabled />
            </UFormField>
            <UFormField label="Password Lama" name="currentPassword">
              <InputPassword
                v-model="state.currentPassword"
                :disabled="authStore.loading"
              />
            </UFormField>

            <UFormField label="Password Baru" name="newPassword">
              <InputPassword
                v-model="state.newPassword"
                :disabled="authStore.loading"
              />
            </UFormField>
          </div>
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
        form="modal-profile"
        icon="i-lucide-check"
        :loading="authStore.loading"
      >
        Simpan
      </UButton>
    </template>
  </UModal>
</template>
