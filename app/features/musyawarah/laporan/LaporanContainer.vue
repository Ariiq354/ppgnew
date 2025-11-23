<script setup lang="ts">
  import type { bidangEnum } from "~~/shared/enum";
  import { getInitialFormData, schema } from "./constants";
  import ViewLaporanModal from "./components/ViewLaporanModal.vue";
  import type { DataReturn } from "./types";

  const authStore = useAuthStore();
  const manageEdit = authStore.hasPermission({ musyawarah_bidang: ["manage"] });

  const props = defineProps<{
    bidang: (typeof bidangEnum)[number];
  }>();

  const { data: musyOption, status: statusMusy } = await useFetch(
    `${APIBASE}/options/musyawarah`
  );

  const musyId = ref<number | undefined>();
  const { data, status, refresh } = await useFetch(
    `${APIBASE}/musyawarah/laporan`,
    {
      query: {
        musyawarahId: musyId,
        bidang: props.bidang,
      },
      immediate: false,
    }
  );
  watchOnce(musyId, () => refresh());

  const state = ref(getInitialFormData(props.bidang));

  const { isLoading, execute } = useSubmit();
  async function onSubmit() {
    const basePath = `${APIBASE}/musyawarah/laporan`;
    await execute({
      path: state.value.id ? `${basePath}/${state.value.id}` : basePath,
      method: state.value.id ? "PUT" : "POST",
      body: {
        musyawarahId: musyId.value,
        ...state.value,
      },
      onSuccess() {
        state.value.laporan = "";
        state.value.keterangan = "";
        state.value.id = undefined;
        modalOpen.value = false;
        refresh();
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
  }

  async function clickDelete(ids: number[]) {
    openConfirmModal(
      "/musyawarah/laporan",
      { id: ids, musyawarahId: musyId, bidang: props.bidang },
      refresh
    );
  }

  const modalOpen = ref(false);
  const stateView = ref();
  function clickView(itemData: DataReturn) {
    modalOpen.value = true;
    stateView.value = itemData;
  }
</script>

<template>
  <ViewLaporanModal v-model:open="modalOpen" :data="stateView" />
  <main class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <UCard v-if="manageEdit" class="md:col-span-2">
      <h1 class="text-2xl font-bold sm:text-3xl">Hasil Musyawarah</h1>
      <p class="text-muted mb-8 text-sm sm:text-base">
        Pencatatan rangkuman hasil musyawarah
      </p>
      <UFormField label="Musyawarah" size="xl">
        <USelectMenu
          v-model="musyId"
          :items="musyOption?.data"
          :disabled="statusMusy === 'pending'"
          value-key="id"
          label-key="nama"
          placeholder="Pilih Musyawarah"
        >
          <template #item="{ item }">
            <div>
              <b class="font-bold">{{ item.nama }}</b> - {{ item.tanggal }}
            </div>
          </template>
        </USelectMenu>
      </UFormField>
      <hr class="border-default my-8 border-t-2" />
      <UForm
        id="laporan-form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex flex-col gap-4">
          <UFormField label="Judul" name="laporan" size="xl">
            <UInput
              v-model="state.laporan"
              placeholder="Masukkan judul untuk laporan ini"
            />
          </UFormField>
          <UFormField label="Keterangan" name="keterangan" size="xl">
            <TipTapEditor v-model="state.keterangan" />
          </UFormField>
        </div>
      </UForm>
      <div class="mt-8 flex w-full justify-end">
        <UButton
          type="submit"
          form="laporan-form"
          icon="i-lucide-save"
          :disabled="!musyId"
          :loading="isLoading"
        >
          Simpan Laporan
        </UButton>
      </div>
    </UCard>
    <UCard v-if="!manageEdit" class="md:col-span-3">
      <h1 class="text-2xl font-bold sm:text-3xl">Hasil Musyawarah</h1>
      <p class="text-muted mb-8 text-sm sm:text-base">
        Pencatatan rangkuman hasil musyawarah
      </p>
      <UFormField label="Musyawarah" size="xl">
        <USelectMenu
          v-model="musyId"
          :items="musyOption?.data"
          :disabled="statusMusy === 'pending'"
          value-key="id"
          label-key="nama"
          placeholder="Pilih Musyawarah"
        >
          <template #item="{ item }">
            <div>
              <b class="font-bold">{{ item.nama }}</b> - {{ item.tanggal }}
            </div>
          </template>
        </USelectMenu>
      </UFormField>
    </UCard>
    <UCard class="h-fit" :class="{ 'md:col-span-3': !manageEdit }">
      <h1 class="text-2xl font-bold sm:text-3xl">Daftar Laporan</h1>
      <p v-if="!musyId" class="text-muted mb-8 text-sm sm:text-base">
        Pilih musyawarah untuk melihat laporan
      </p>
      <p v-else class="text-muted mb-8 text-sm sm:text-base">
        Laporan
        {{ musyOption?.data.find((i) => i.id === musyId!)?.nama }}
      </p>
      <div class="flex items-center justify-center"></div>
      <div v-if="!musyId" class="py-8 text-center">
        <UIcon
          name="i-lucide-file-text"
          class="text-muted mx-auto mb-2 h-8 w-8"
        />
        <p class="text-muted">Pilih musyawarah untuk melihat laporan</p>
      </div>
      <div v-else-if="status === 'pending'" class="py-8 text-center">
        <UIcon
          name="i-lucide-loader-circle"
          class="text-muted mx-auto mb-2 h-8 w-8 animate-spin"
        />
        <p class="text-muted">Loading</p>
      </div>
      <div v-else-if="data?.data.length === 0" class="py-8 text-center">
        <UIcon
          name="i-lucide-file-text"
          class="text-muted mx-auto mb-2 h-8 w-8"
        />
        <p class="text-muted">Belum ada laporan</p>
        <p class="text-muted text-sm">
          Buat laporan pertama untuk musyawarah ini
        </p>
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="item in data?.data"
          :key="item.id"
          class="border-muted flex items-center justify-between rounded-md border p-2 transition-all duration-300 hover:shadow-md"
          @click="clickView(item)"
        >
          <p class="text-lg font-bold">
            {{ item.laporan }}
          </p>
          <UTooltip v-if="manageEdit" text="Hapus">
            <UButton
              icon="i-lucide-trash-2"
              variant="ghost"
              color="error"
              class="rounded-full"
              @click.stop="clickDelete([item.id])"
            />
          </UTooltip>
        </div>
      </div>
    </UCard>
  </main>
</template>
