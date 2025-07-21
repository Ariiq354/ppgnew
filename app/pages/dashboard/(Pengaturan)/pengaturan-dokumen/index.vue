<script setup lang="ts">
  const constantStore = useConstantStore();
  const authStore = useAuthStore();

  const documents = ref([
    {
      id: "1",
      name: "Project Proposal.pdf",
      url: "/placeholder.svg?height=200&width=200",
      size: 2048000,
      type: "application/pdf",
      uploadedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Meeting Notes.docx",
      url: "/placeholder.svg?height=200&width=200",
      size: 1024000,
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      uploadedAt: "2024-01-14T14:20:00Z",
    },
    {
      id: "3",
      name: "Budget Spreadsheet.xlsx",
      url: "/placeholder.svg?height=200&width=200",
      size: 512000,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      uploadedAt: "2024-01-13T09:15:00Z",
    },
  ]);

  onMounted(() => {
    constantStore.setTitle("Pengaturan / Dokumen");
  });

  function getFileIcon(type: string) {
    if (type.includes("pdf")) return "📄";
    if (type.includes("word")) return "📝";
    if (type.includes("sheet")) return "📊";
    if (type.includes("image")) return "🖼️";
    return "📁";
  }

  function formatFileSize(bytes: number) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function handleUpload() {}
  function handleDownload() {}
  function handleDelete() {}

  const canUpload = await authStore.hasPermission({ dokumen: ["upload"] });
</script>

<template>
  <Title>Pengaturan | Dokumen</Title>
  <div>
    <UCard v-if="canUpload" class="mb-12">
      <UButton size="xl" icon="i-heroicons-document-plus" @click="handleUpload">
        Upload Dokumen
      </UButton>
    </UCard>
    <UCard v-if="documents.length === 0" class="py-12">
      <div class="flex w-full flex-col items-center">
        <UIcon name="i-heroicons-document-text" class="mb-4 h-12 w-12" />
        <h3 class="mb-2 text-lg font-semibold">No documents yet</h3>
        <p class="text-muted-foreground mb-4">
          Upload your first document to get started
        </p>
      </div>
    </UCard>
    <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="(item, index) in documents" :key="index">
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
          <span>Uploaded {{ formatDate(item.uploadedAt) }}</span>
        </div>
        <hr class="border-t-gray-300" />
        <div class="mt-4 flex items-center gap-2">
          <UButton
            variant="subtle"
            class="flex w-full items-center justify-center"
            @click="handleDownload"
          >
            <UIcon name="i-heroicons-eye" size="18" />
            View
          </UButton>
          <UButton
            variant="subtle"
            class="flex w-full items-center justify-center"
            @click="handleDownload"
          >
            <UIcon name="i-heroicons-arrow-down-tray" size="18" />
            Download
          </UButton>
          <UButton variant="subtle" color="error" @click="handleDelete">
            <UIcon name="i-heroicons-trash" size="18" />
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
