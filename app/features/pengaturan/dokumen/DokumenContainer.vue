<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import { getInitialFormData, type Schema } from "./constants";
  import { formatDate, formatFileSize, getFileIcon } from "~/utils/format";
  import CreateModal from "./components/CreateModal.vue";

  const authStore = useAuthStore();
  const canUpload = authStore.hasPermission({ dokumen: ["upload"] });

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

  async function handleDelete(ids: number) {
    openConfirmModal("/dokumen", { id: [ids] }, refresh);
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
  <CreateModal
    v-model:open="modalOpen"
    v-model:state="state"
    :is-loading="isLoading"
    :on-submit="onSubmit"
  />
  <UCard v-if="canUpload" class="mb-4 md:mb-6">
    <UButton size="xl" icon="i-lucide-file-plus-2" @click="clickAdd">
      Upload Dokumen
    </UButton>
  </UCard>
  <UCard v-if="data?.data.length === 0" class="py-24">
    <div class="flex w-full flex-col items-center">
      <UIcon name="i-lucide-file-text" class="mb-4 h-12 w-12" />
      <h3 class="mb-2 text-lg font-semibold">Belum ada dokumen</h3>
      <p class="text-muted-foreground mb-4">
        Silahkan Upload dokumen pertama untuk memulai
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
      <div class="text-muted my-3">
        <span>Uploaded {{ formatDate(item.createdAt) }}</span>
      </div>
      <hr class="border-t-gray-300" />
      <div class="mt-4 flex items-center gap-2">
        <UButton
          icon="i-lucide-download"
          variant="subtle"
          class="flex w-full items-center justify-center"
          @click="handleDownload(item.url)"
        >
          Download
        </UButton>
        <UButton
          icon="i-lucide-trash-2"
          variant="subtle"
          color="error"
          @click="handleDelete(item.id)"
        />
      </div>
    </UCard>
  </div>
</template>
