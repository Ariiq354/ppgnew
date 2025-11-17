<script setup lang="ts">
  import { useSubmit } from "~/composables/function";
  import { useToastError, useToastSuccess } from "~/composables/toast";
  import { useAuthStore } from "~/stores/auth";
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE, type ExtractObjectType } from "~/utils";
  import { columns } from "./_constants";
  import { absensiEnum } from "~~/shared/enum";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const absensiManage = authStore.hasPermission({
    pjp_desa: ["manage"],
  });
  constantStore.setTitle("PJP Desa / Absensi Generus GPS");

  const kelasId = ref<number>();
  const { data: kelasOption, status: statusKelas } = await useFetch(
    `${APIBASE}/options/kelas-gps`
  );
  const state = ref<ExtractObjectType<typeof absensi.value>[]>([]);
  const {
    data: absensi,
    status: statusAbsensi,
    refresh,
  } = await useFetch(() => `${APIBASE}/absensi-gps/${kelasId.value}`, {
    immediate: false,
    watch: false,
  });
  watch(kelasId, () => {
    if (kelasId.value) {
      refresh();
    }
  });
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
  const generusCount = ref(0);
  watch(kelasId, () => {
    generusCount.value = data.value ? data.value.metadata.total : 0;
  });

  const query = reactive({
    search: "",
    page: 1,
  });
  const searchDebounced = useDebounceFn((v) => {
    query.search = v;
  }, 300);
  const { data, status } = await useFetch(`${APIBASE}/absensi-gps/generus`, {
    query,
  });

  const { isLoading, execute } = useSubmit();
  async function onSubmit() {
    await execute({
      path: `${APIBASE}/absensi-gps`,
      body: {
        kelasId: kelasId.value,
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
    generusId: number,
    keterangan: (typeof absensiEnum)[number]
  ) {
    isChange.value = true;
    const item = state.value.find((item) => item.generusId === generusId);

    if (!item) {
      state.value.push({
        id: undefined!,
        generusId,
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
  <Title>PJP Desa | Absensi Generus</Title>
  <main class="flex flex-col gap-4">
    <UCard>
      <h1 class="text-2xl font-bold sm:text-3xl">Pilih Kelas</h1>
      <p class="text-muted mb-8 text-sm sm:text-base">
        Silahkan pilih Kelas untuk absensi
      </p>
      <div>
        <UFormField label="Kelas" size="xl">
          <USelectMenu
            v-model="kelasId"
            :items="kelasOption?.data"
            :disabled="statusKelas === 'pending'"
            value-key="id"
            label-key="nama"
            placeholder="Pilih Kelas"
          >
            <template #item="{ item }">
              <div>
                <b class="font-bold">{{ item.nama }}</b> - {{ item.tanggal }}
              </div>
            </template>
          </USelectMenu>
        </UFormField>
      </div>
    </UCard>
    <UCard v-if="!kelasId">
      <div class="flex flex-col items-center justify-center gap-4 py-16">
        <UIcon name="i-lucide-user-check" size="50" />
        <h2 class="text-xl font-bold">Pilih Kelas</h2>
        <p class="text-muted text-center">
          Silahkan pilih kelas di menu diatas untuk memulai absensi
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
            {{ (generusCount ?? 0) - hadirCount - izinCount }}
          </p>
          <p class="text-muted">Tanpa Keterangan</p>
        </UCard>
        <UCard>
          <p class="text-4xl font-bold">{{ generusCount }}</p>
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
                state.find((i) => i.generusId === row.original.id)
                  ?.keterangan ?? 'Tanpa Keterangan'
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
                state.find((i) => i.generusId === row.original.id)?.detail
              "
              placeholder="Keterangan..."
              :disabled="!absensiManage || statusAbsensi === 'pending'"
              @update:model-value="
                (event) => {
                  ((state.find((i) => i.generusId === row.original.id)!.detail =
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
