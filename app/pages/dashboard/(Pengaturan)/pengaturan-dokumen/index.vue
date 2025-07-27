<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { schema, getInitialFormData, type Schema } from "./_constants";
  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const canUpload = await authStore.hasPermission({ dokumen: ["upload"] });

  onMounted(() => {
    constantStore.setTitle("Pengaturan / Dokumen");
  });

  const { data, refresh } = await useFetch(`${APIBASE}/dokumen`);

  const modalOpen = ref(false);
  const state = ref(getInitialFormData());

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const formData = new FormData();
    formData.append("file", event.data.file);

    await execute({
      path: `${APIBASE}/dokumen`,
      body: formData,
      method: "POST",
      async onSuccess() {
        useToastSuccess("Upload Sukses", "Dokumen anda sudah tersimpan");
        await refresh();
        modalOpen.value = false;
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
  }

  async function handleDelete(id: number) {
    async function onDelete() {
      await $fetch(`${APIBASE}/dokumen`, {
        method: "DELETE",
        body: {
          id: [id],
        },
      });
      await refresh();
    }
    openConfirmModal(onDelete);
  }

  function clickAdd() {
    state.value = getInitialFormData();
    modalOpen.value = true;
  }

  function handleDownload(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.rel = "noopener noreferrer";
    a.click();
  }
</script>

<template>
  <Title>Pengaturan | Dokumen</Title>
  <LazyUModal
    v-model:open="modalOpen"
    title="Upload Dokumen"
    description="Select a file to upload to your document library."
  >
    <template #body>
      <UForm
        id="dokumen-form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField name="file">
          <UFileUpload
            v-model="state.file"
            label="Drop your file here"
            description="max. 5MB"
            class="min-h-48"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton
        icon="i-heroicons-x-mark-16-solid"
        variant="ghost"
        :disabled="isLoading"
        @click="modalOpen = false"
      >
        Batal
      </UButton>
      <UButton
        type="submit"
        icon="i-heroicons-check-16-solid"
        :loading="isLoading"
        form="dokumen-form"
      >
        Simpan
      </UButton>
    </template>
  </LazyUModal>
  <div>
    <UCard v-if="canUpload" class="mb-12">
      <UButton size="xl" icon="i-heroicons-document-plus" @click="clickAdd">
        Upload Dokumen
      </UButton>
    </UCard>
    <UCard v-if="data?.data.length === 0" class="py-12">
      <div class="flex w-full flex-col items-center">
        <UIcon name="i-heroicons-document-text" class="mb-4 h-12 w-12" />
        <h3 class="mb-2 text-lg font-semibold">No documents yet</h3>
        <p class="text-muted-foreground mb-4">
          Upload your first document to get started
        </p>
      </div>
    </UCard>
    <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="(item, index) in data?.data" :key="index">
        <div class="flex items-center gap-2">
          <span class="text-4xl">{{ getFileIcon(item.type) }}</span>
          <div>
            <div class="truncate text-lg font-bold">
              {{ item.name }}
            </div>
            <div>{{ formatFileSize(item.size) }}</div>
          </div>
        </div>
        <div class="my-3 text-(--ui-text-muted)">
          <span>Uploaded {{ formatDate(item.createdAt) }}</span>
        </div>
        <hr class="border-t-gray-300" />
        <div class="mt-4 flex items-center gap-2">
          <UButton
            variant="subtle"
            class="flex w-full items-center justify-center"
            @click="handleDownload(item.url)"
          >
            <UIcon name="i-heroicons-arrow-down-tray" size="18" />
            Download
          </UButton>
          <UButton
            variant="subtle"
            color="error"
            @click="handleDelete(item.id)"
          >
            <UIcon name="i-heroicons-trash" size="18" />
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
