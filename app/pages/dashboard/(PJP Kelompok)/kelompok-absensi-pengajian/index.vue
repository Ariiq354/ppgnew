<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { columns } from "./_constants";
  import { useAuthStore } from "~/stores/auth";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { useSubmit } from "~/composables/function";
  import { useToastError, useToastSuccess } from "~/composables/toast";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const absensiManage = authStore.hasPermission({
    pjp_kelompok: ["manage"],
  });
  constantStore.setTitle("PJP Kelompok / Absensi Jamaah");

  const pengajianId = ref<number>();
  const { data: pengajianOption, status: statusPengajian } = await useFetch(
    `${APIBASE}/options/pengajian`
  );
  const state = ref<ExtractObjectType<typeof absensi.value>[]>([]);
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
  const hadirCount = computed(() =>
    state.value.reduce((a, i) => {
      return a + (i.keterangan === "Hadir" ? 1 : 0);
    }, 0)
  );
  const izinCount = computed(() =>
    state.value.reduce((a, i) => {
      return a + (i.keterangan === "Izin" ? 1 : 0);
    }, 0)
  );
  const jamaahCount = ref(0);
  watch(pengajianId, () => {
    jamaahCount.value = data.value ? data.value.metadata.total : 0;
  });

  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
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
  function handleStatusChange(jamaahId: number, keterangan: string) {
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

  watch(
    () => [query.search],
    () => {
      query.page = 1;
    }
  );
</script>

<template>
  <Title>PJP Kelompok | Absensi Jamaah</Title>
  <main class="flex flex-col gap-4">
    <UCard>
      <h1 class="text-2xl font-bold sm:text-3xl">Pilih Pengajian</h1>
      <p class="text-muted mb-8 text-sm sm:text-base">
        Silahkan pilih Pengajian untuk absensi
      </p>
      <UFormField label="Pengajian" size="xl">
        <USelectMenu
          v-model="pengajianId"
          :items="pengajianOption?.data"
          :disabled="statusPengajian === 'pending'"
          value-key="id"
          label-key="nama"
          placeholder="Pilih Pengajian"
        >
          <template #item="{ item }">
            <div>
              <b class="font-bold">{{ item.nama }}</b> - {{ item.tanggal }}
            </div>
          </template>
        </USelectMenu>
      </UFormField>
    </UCard>
    <UCard v-if="!pengajianId">
      <div class="flex flex-col items-center justify-center gap-4 py-16">
        <UIcon name="i-lucide-user-check" size="50" />
        <h2 class="text-xl font-bold">Pilih Pengajian</h2>
        <p class="text-muted text-center">
          Silahkan pilih pengajian di menu diatas untuk memulai absensi
        </p>
      </div>
    </UCard>
    <template v-else>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <UCard>
          <p class="text-success text-4xl font-bold">{{ hadirCount }}</p>
          <p class="text-muted">Hadir</p>
        </UCard>
        <UCard>
          <p class="text-info text-4xl font-bold">{{ izinCount }}</p>
          <p class="text-muted">Izin</p>
        </UCard>
        <UCard>
          <p class="text-error text-4xl font-bold">
            {{ (jamaahCount ?? 0) - hadirCount - izinCount }}
          </p>
          <p class="text-muted">Tanpa Keterangan</p>
        </UCard>
        <UCard>
          <p class="text-4xl font-bold">{{ jamaahCount }}</p>
          <p class="text-muted">Total</p>
        </UCard>
      </div>
      <UCard>
        <div class="mb-4 flex gap-2 md:mb-6 md:gap-4">
          <UInput
            size="xl"
            class="flex-5"
            leading-icon="i-lucide-search"
            placeholder="Search..."
            @update:model-value="searchDebounced"
          />
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
              :items="['Hadir', 'Izin', 'Tanpa Keterangan']"
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
