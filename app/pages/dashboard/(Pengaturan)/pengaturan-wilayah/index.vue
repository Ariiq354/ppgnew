<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import {
    columns,
    getInitialFormData,
    schema,
    type Schema,
  } from "./_constants";

  type WilayahType = "daerah" | "desa" | "kelompok";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();

  onMounted(() => {
    constantStore.setTitle("Pengaturan / Daftar Wilayah");
  });

  const wilayah = ref<WilayahType>();
  const modalOpen = ref(false);
  const state = ref(getInitialFormData());

  // Selected row tracking
  const selectedRows = reactive({
    daerah: {} as Record<string, boolean>,
    desa: {} as Record<string, boolean>,
    kelompok: {} as Record<string, boolean>,
  });

  const queries = reactive({
    daerah: { page: 1, limit: 5 },
    desa: { page: 1, limit: 5, daerahId: 0 },
    kelompok: { page: 1, limit: 5, desaId: 0 },
  });

  const {
    data: dDaerah,
    refresh: rDaerah,
    status: sDaerah,
  } = await useFetch(`${APIBASE}/daerah`, {
    query: computed(() => queries.daerah),
  });
  const {
    data: dDesa,
    refresh: rDesa,
    status: sDesa,
  } = await useFetch(`${APIBASE}/desa`, {
    immediate: false,
    query: computed(() => queries.desa),
  });
  const {
    data: dKelompok,
    refresh: rKelompok,
    status: sKelompok,
  } = await useFetch(`${APIBASE}/kelompok`, {
    immediate: false,
    query: computed(() => queries.kelompok),
  });
  watch(queries.desa, () => {
    if (queries.desa.daerahId > 0) {
      rDesa();
    }
  });
  watch(queries.kelompok, () => {
    if (queries.kelompok.desaId > 0) {
      rKelompok();
    }
  });

  const isDaerahDisabled = ref(false);
  const isDesaDisabled = computed(() => !queries.desa.daerahId);
  const isKelompokDisabled = computed(() => !queries.kelompok.desaId);

  const modalTitle = computed(() => {
    const action = state.value.id ? "Edit" : "Tambah";
    const typeLabel =
      wilayah.value === "daerah"
        ? "Daerah"
        : wilayah.value === "desa"
          ? "Desa"
          : "Kelompok";
    return `${action} ${typeLabel}`;
  });

  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (!wilayah.value) return;

    const body: Record<string, any> = {
      name: event.data.name,
    };

    // Add parent ID based on wilayah type
    if (wilayah.value === "desa") {
      body.daerahId = queries.desa.daerahId;
    } else if (wilayah.value === "kelompok") {
      body.desaId = queries.kelompok.desaId;
    }

    await execute({
      path: state.value.id
        ? `${APIBASE}/${wilayah.value}/${state.value.id}`
        : `${APIBASE}/${wilayah.value}`,
      body,
      method: state.value.id ? "PUT" : "POST",
      async onSuccess() {
        useToastSuccess("Berhasil", "Data berhasil tersimpan");
        await refreshData(wilayah.value!);
        resetForm();
      },
      onError(error) {
        useToastError("Gagal", error.data?.message || "Terjadi kesalahan");
      },
    });
  }

  function resetForm() {
    state.value = getInitialFormData();
    modalOpen.value = false;
  }

  async function refreshData(type: WilayahType) {
    switch (type) {
      case "daerah":
        await rDaerah();
        break;
      case "desa":
        await rDesa();
        break;
      case "kelompok":
        await rKelompok();
        break;
    }
  }

  function clickAdd(str: "daerah" | "desa" | "kelompok") {
    wilayah.value = str;
    state.value = getInitialFormData();
    modalOpen.value = true;
  }

  async function handleDelete(type: WilayahType, id: number) {
    wilayah.value = type;

    const onConfirm = async () => {
      try {
        await $fetch(`${APIBASE}/${type}`, {
          method: "DELETE",
          body: { id: [id] },
        });

        useToastSuccess("Berhasil", "Data berhasil dihapus");
        await refreshData(type);
      } catch (error: any) {
        useToastError("Gagal", error.data?.message || "Gagal menghapus data");
      }
    };

    openConfirmModal(onConfirm);
  }

  function openEditModal(type: WilayahType, id: number, name: string) {
    wilayah.value = type;
    state.value.id = id;
    state.value.name = name;
    modalOpen.value = true;
  }

  function onSelect(type: WilayahType, row: any) {
    const selectedId = row.original.id;
    selectedRows[type] = { [row.index]: true };

    if (type === "daerah") {
      queries.desa.daerahId = selectedId;
      queries.kelompok.desaId = 0;
      selectedRows["desa"] = {};
      selectedRows["kelompok"] = {};
    } else if (type === "desa") {
      selectedRows["kelompok"] = {};
      queries.kelompok.desaId = selectedId;
    }
  }

  const [
    daerahCreate,
    daerahUpdate,
    daerahDelete,
    desaCreate,
    desaUpdate,
    desaDelete,
    kelompokCreate,
    kelompokUpdate,
    kelompokDelete,
  ] = await Promise.all([
    authStore.hasPermission({ daerah: ["create"] }),
    authStore.hasPermission({ daerah: ["update"] }),
    authStore.hasPermission({ daerah: ["delete"] }),

    authStore.hasPermission({ desa: ["create"] }),
    authStore.hasPermission({ desa: ["update"] }),
    authStore.hasPermission({ desa: ["delete"] }),

    authStore.hasPermission({ kelompok: ["create"] }),
    authStore.hasPermission({ kelompok: ["update"] }),
    authStore.hasPermission({ kelompok: ["delete"] }),
  ]);

  const permissions = computed(() => ({
    daerah: {
      create: daerahCreate,
      update: daerahUpdate,
      delete: daerahDelete,
    },
    desa: {
      create:
        desaCreate &&
        (authStore.user?.role === "admin" ||
          (authStore.user?.role === "user,daerah" &&
            authStore.user?.daerahId === queries.desa.daerahId)),
      update:
        desaUpdate &&
        (authStore.user?.role === "admin" ||
          (authStore.user?.role === "user,daerah" &&
            authStore.user?.daerahId === queries.desa.daerahId)),
      delete:
        desaDelete &&
        (authStore.user?.role === "admin" ||
          (authStore.user?.role === "user,daerah" &&
            authStore.user?.daerahId === queries.desa.daerahId)),
    },
    kelompok: {
      create:
        kelompokCreate &&
        (authStore.user?.role === "admin" ||
          (authStore.user?.role === "user,daerah" &&
            authStore.user?.daerahId === queries.desa.daerahId) ||
          (authStore.user?.role === "user,desa" &&
            authStore.user?.desaId === queries.kelompok.desaId)),
      update:
        kelompokUpdate &&
        (authStore.user?.role === "admin" ||
          (authStore.user?.role === "user,daerah" &&
            authStore.user?.daerahId === queries.desa.daerahId) ||
          (authStore.user?.role === "user,desa" &&
            authStore.user?.desaId === queries.kelompok.desaId)),
      delete:
        kelompokDelete &&
        (authStore.user?.role === "admin" ||
          (authStore.user?.role === "user,daerah" &&
            authStore.user?.daerahId === queries.desa.daerahId) ||
          (authStore.user?.role === "user,desa" &&
            authStore.user?.desaId === queries.kelompok.desaId)),
    },
  }));

  const cardConfigs = [
    {
      type: "daerah" as WilayahType,
      title: "Daerah",
      data: dDaerah,
      query: queries.daerah,
      disabled: isDaerahDisabled,
      loading: computed(() => sDaerah.value),
    },
    {
      type: "desa" as WilayahType,
      title: "Desa",
      data: dDesa,
      query: queries.desa,
      disabled: isDesaDisabled,
      loading: computed(() => sDesa.value),
    },
    {
      type: "kelompok" as WilayahType,
      title: "Kelompok",
      data: dKelompok,
      query: queries.kelompok,
      disabled: isKelompokDisabled,
      loading: computed(() => sKelompok.value),
    },
  ];
</script>

<template>
  <Title>Daftar Wilayah</Title>
  <LazyUModal
    v-model:open="modalOpen"
    :title="modalTitle"
    :description="`Masukkan data ${wilayah || 'item'} ${state.id ? 'yang akan diubah' : 'baru'}`"
  >
    <template #body>
      <UForm
        id="wilayah-form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Nama" name="name">
          <UInput
            v-model="state.name"
            :disabled="isLoading"
            placeholder="Masukkan nama..."
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
        form="wilayah-form"
      >
        {{ state.id ? "Perbarui" : "Simpan" }}
      </UButton>
    </template>
  </LazyUModal>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    {{ permissions }}
    <UCard v-for="config in cardConfigs" :key="config.type">
      <!-- Card Header -->
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-2xl font-bold">{{ config.title }}</h2>
        <UButton
          size="xl"
          class="flex items-center gap-2"
          :disabled="config.disabled.value || !permissions[config.type].create"
          @click="clickAdd(config.type)"
        >
          <UIcon name="i-heroicons-plus" />
          Tambah
        </UButton>
      </div>

      <!-- Data Table -->
      <div>
        <UTable
          v-model:row-selection="selectedRows[config.type]"
          class="rounded-lg border border-gray-200 dark:border-gray-700"
          :columns="columns"
          :ui="{
            tr: 'hover:bg-elevated/50',
          }"
          :data="config.data.value?.data || []"
          :loading="config.loading.value === 'pending'"
          @select="(row) => onSelect(config.type, row)"
        >
          <template #actions-header="{ column }">
            <div class="text-center">{{ column.columnDef.header }}</div>
          </template>

          <template #actions-cell="{ row }">
            <div class="flex justify-center gap-2">
              <UTooltip text="Edit">
                <UButton
                  icon="i-heroicons-pencil"
                  variant="ghost"
                  class="rounded-full"
                  :disabled="!permissions[config.type].update"
                  @click="
                    openEditModal(
                      config.type,
                      row.original.id,
                      row.original.name
                    )
                  "
                />
              </UTooltip>

              <UTooltip text="Hapus">
                <UButton
                  icon="i-heroicons-trash"
                  variant="ghost"
                  color="error"
                  class="rounded-full"
                  :disabled="!permissions[config.type].delete"
                  @click="handleDelete(config.type, row.original.id)"
                />
              </UTooltip>
            </div>
          </template>
        </UTable>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex items-center justify-end gap-4">
        <WilayahPagination
          v-model:page="config.query.page"
          :total="config.data.value?.metadata?.total || 0"
        />
      </div>
    </UCard>
  </div>
</template>
