<script setup lang="ts">
  import { useSubmit } from "~/composables/function";
  import { useToastError, useToastSuccess } from "~/composables/toast";
  import { useAuthStore } from "~/stores/auth";
  import { APIBASE } from "~/utils";
  import { absensiEnum } from "~~/shared/enum";
  import EmptyCard from "./components/EmptyCard.vue";
  import PengajianCard from "./components/PengajianCard.vue";
  import SummaryCard from "./components/SummaryCard.vue";
  import { columns } from "./constants";
  import type { DataReturn, QueryType } from "./types";

  const authStore = useAuthStore();
  const absensiManage = authStore.hasPermission({
    pjp_kelompok: ["manage"],
  });

  const pengajianId = ref<number>();
  const state = ref<DataReturn[]>([]);
  const {
    data: absensi,
    status: statusAbsensi,
    refresh,
  } = await useFetch(() => `${APIBASE}/absensi-jamaah/${pengajianId.value}`, {
    immediate: false,
  });
  watchOnce(pengajianId, () => refresh());
  watch(
    absensi,
    () => (state.value = structuredClone(absensi.value?.data) ?? [])
  );

  const query = reactive<QueryType>({
    page: 1,
  });
  const { data, status } = await useFetch(`${APIBASE}/jamaah`, {
    query,
  });

  const { isLoading, execute } = useSubmit();
  async function onSubmit() {
    await execute({
      path: `${APIBASE}/absensi-jamaah`,
      body: {
        pengajianId: pengajianId.value,
        absen: state.value,
      },
      onSuccess() {
        useToastSuccess("Absensi Berhasil", "Absensi berhasil di update");
        isChange.value = false;
        state.value = [];
        refresh();
      },
      onError(error) {
        useToastError(String(error.statusCode), error.data.message);
      },
    });
  }

  const isChange = ref(false);
  function handleStatusChange(
    jamaahId: number,
    keterangan: (typeof absensiEnum)[number]
  ) {
    isChange.value = true;
    const item = state.value.find((item) => item.jamaahId === jamaahId);

    if (!item) {
      state.value.push({
        id: undefined!,
        jamaahId,
        keterangan,
        detail: "",
      });
    } else {
      item.keterangan = keterangan;
    }
  }
</script>

<template>
  <main class="flex flex-col gap-4">
    <PengajianCard v-model="pengajianId" />
    <EmptyCard v-if="!pengajianId || !absensi" />
    <template v-else>
      <SummaryCard
        :member-count="data?.metadata.total"
        :absensi="absensi.data"
      />
      <UCard>
        <div class="mb-4 flex gap-2 md:mb-6 md:gap-4">
          <InputSearch v-model="query.search" />
          <UButton
            v-if="absensiManage"
            icon="i-lucide-save"
            class="text-white dark:bg-blue-600 hover:dark:bg-blue-600/75"
            :disabled="!isChange"
            :loading="isLoading"
            @click="onSubmit"
          >
            <p class="hidden md:block">Simpan Absensi</p>
          </UButton>
        </div>
        <AppTable
          v-model:page="query.page"
          :columns="columns"
          :data="data?.data"
          :loading="status === 'pending' || statusAbsensi === 'pending'"
          :total="data?.metadata.total"
          enumerate
          pagination
        >
          <template #absensi-cell="{ row }">
            <USelect
              :model-value="
                state.find((i) => i.jamaahId === row.original.id)?.keterangan ??
                'Tanpa Keterangan'
              "
              class="w-full"
              size="xl"
              :items="[...absensiEnum]"
              default-value="Tanpa Keterangan"
              :disabled="!absensiManage || statusAbsensi === 'pending'"
              @update:model-value="
                (event) => handleStatusChange(row.original.id, event)
              "
            />
          </template>
          <template #keterangan-cell="{ row }">
            <UInput
              :model-value="
                state.find((i) => i.jamaahId === row.original.id)?.detail
              "
              placeholder="Keterangan..."
              :disabled="!absensiManage || statusAbsensi === 'pending'"
              @update:model-value="
                (event) => {
                  ((state.find((i) => i.jamaahId === row.original.id)!.detail =
                    event as string),
                    (isChange = true));
                }
              "
            />
          </template>
        </AppTable>
      </UCard>
    </template>
  </main>
</template>
