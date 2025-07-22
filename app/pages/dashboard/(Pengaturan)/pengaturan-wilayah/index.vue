<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui";
  import {
    columns,
    getInitialFormData,
    schema,
    type Schema,
  } from "./_constants";

  const constantStore = useConstantStore();

  onMounted(() => {
    constantStore.setTitle("Pengaturan / Daftar Wilayah");
  });

  const wilayah = ref<"daerah" | "desa" | "kelompok">();
  const queryD = ref({
    page: 1,
    limit: 5,
  });
  const queryDs = ref({
    page: 1,
    limit: 5,
    daerahId: undefined,
  });
  const queryK = ref({
    page: 1,
    limit: 5,
    desaId: undefined,
  });
  const { data: dDaerah, refresh: rDaerah } = await useFetch(
    `${APIBASE}/daerah`,
    {
      query: queryD,
    }
  );
  const { data: dDesa, refresh: rDesa } = await useFetch(`${APIBASE}/desa`, {
    immediate: false,
    query: queryDs,
  });
  const { data: dKelompok, refresh: rKelompok } = await useFetch(
    `${APIBASE}/kelompok`,
    {
      immediate: false,
      query: queryK,
    }
  );

  const modalOpen = ref(false);
  const state = ref(getInitialFormData());
  const { isLoading, execute } = useSubmit();
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    await execute({
      path: state.value.id
        ? `${APIBASE}/${wilayah.value}/${state.value.id}`
        : `${APIBASE}/${wilayah.value}`,
      body: {
        name: event.data.name,
        ...(wilayah.value === "desa"
          ? { daerahId: queryDs.value.daerahId }
          : wilayah.value === "kelompok"
            ? { desaId: queryK.value.desaId }
            : undefined),
      },
      method: state.value.id ? "PUT" : "POST",
      async onSuccess() {
        useToastSuccess("Submit Success", "Data berhasil tersimpan");
        switch (wilayah.value) {
          case "daerah":
            await rDaerah();
            break;
          case "desa":
            await rDesa();
            break;
          default:
            await rKelompok();
        }
        state.value.id = undefined;
        modalOpen.value = false;
      },
      onError(error) {
        useToastError("Submit Failed", error.data.message);
      },
    });
  }

  function clickAdd(str: "daerah" | "desa" | "kelompok") {
    wilayah.value = str;
    state.value = getInitialFormData();
    modalOpen.value = true;
  }

  async function handleDelete(str: "daerah" | "desa" | "kelompok", id: number) {
    wilayah.value = str;
    async function onDelete() {
      await $fetch(`${APIBASE}/${wilayah.value}`, {
        method: "DELETE",
        body: {
          id: [id],
        },
      });
      switch (wilayah.value) {
        case "daerah":
          await rDaerah();
          break;
        case "desa":
          await rDesa();
          break;
        default:
          await rKelompok();
      }
    }
    openConfirmModal(onDelete);
  }

  function openEditModal(
    str: "daerah" | "desa" | "kelompok",
    id: number,
    name: string
  ) {
    modalOpen.value = true;
    state.value.id = id;
    state.value.name = name;
    wilayah.value = str;
  }

  function onSelect(str: "daerah" | "desa" | "kelompok", row: any) {
    if (str === "daerah") {
      queryDs.value.daerahId = row.original.id;
    }
    if (str === "desa") {
      queryK.value.desaId = row.original.id;
    }
  }
</script>

<template>
  <Title>Daftar Wilayah</Title>
  <LazyUModal
    v-model:open="modalOpen"
    title="Tambah Item"
    description="Masukkan item baru"
  >
    <template #body>
      <UForm
        id="dokumen-form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" :disabled="isLoading" />
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
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <UCard>
      <div class="mb-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold">Daerah</h1>
        <UButton
          size="xl"
          class="flex items-center"
          @click="clickAdd('daerah')"
        >
          <UIcon name="i-heroicons-plus" />
          Add
        </UButton>
      </div>
      <UTable
        class="rounded-lg border border-(--ui-border-muted)"
        :columns="columns"
        :ui="{
          tr: 'hover:bg-elevated/50',
        }"
        :data="dDaerah?.data"
        @select="(row) => onSelect('daerah', row)"
      >
        <template #actions-header="{ column }">
          <div class="text-center">{{ column.columnDef.header }}</div>
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-center gap-4">
            <UButton
              icon="i-heroicons-pencil"
              variant="ghost"
              class="rounded-full"
              @click="
                openEditModal('daerah', row.original.id, row.original.name)
              "
            />
            <UButton
              icon="i-heroicons-trash"
              variant="ghost"
              color="error"
              class="rounded-full"
              @click="handleDelete('daerah', row.original.id)"
            />
          </div>
        </template>
      </UTable>
      <div class="flex items-center justify-end space-x-4 py-4">
        <WilayahPagination
          v-model:page="queryD.page"
          :total="dDaerah ? dDaerah!.metadata.total : 1"
        />
      </div>
    </UCard>
    <UCard>
      <div class="mb-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold">Desa</h1>
        <UButton
          size="xl"
          class="flex items-center"
          :disabled="!queryDs.daerahId"
          @click="clickAdd('desa')"
        >
          <UIcon name="i-heroicons-plus" />
          Add
        </UButton>
      </div>
      <UTable
        class="rounded-lg border border-(--ui-border-muted)"
        :columns="columns"
        :ui="{
          tr: 'hover:bg-elevated/50',
        }"
        :data="dDesa?.data"
        @select="(row) => onSelect('desa', row)"
      >
        <template #actions-header="{ column }">
          <div class="text-center">{{ column.columnDef.header }}</div>
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-center gap-4">
            <UButton
              icon="i-heroicons-pencil"
              variant="ghost"
              class="rounded-full"
              @click="openEditModal('desa', row.original.id, row.original.name)"
            />
            <UButton
              icon="i-heroicons-trash"
              variant="ghost"
              color="error"
              class="rounded-full"
              @click="handleDelete('desa', row.original.id)"
            />
          </div>
        </template>
      </UTable>
      <div class="flex items-center justify-end space-x-4 py-4">
        <WilayahPagination
          v-model:page="queryDs.page"
          :total="dDesa ? dDesa!.metadata.total : 1"
        />
      </div>
    </UCard>
    <UCard>
      <div class="mb-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold">Kelompok</h1>
        <UButton
          size="xl"
          class="flex items-center"
          :disabled="!queryK.desaId"
          @click="clickAdd('kelompok')"
        >
          <UIcon name="i-heroicons-plus" />
          Add
        </UButton>
      </div>
      <UTable
        class="rounded-lg border border-(--ui-border-muted)"
        :columns="columns"
        :ui="{
          tr: 'hover:bg-elevated/50',
        }"
        :data="dKelompok?.data"
        @select="(row) => onSelect('kelompok', row)"
      >
        <template #actions-header="{ column }">
          <div class="text-center">{{ column.columnDef.header }}</div>
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-center gap-4">
            <UButton
              icon="i-heroicons-pencil"
              variant="ghost"
              class="rounded-full"
              @click="
                openEditModal('daerah', row.original.id, row.original.name)
              "
            />
            <UButton
              icon="i-heroicons-trash"
              variant="ghost"
              color="error"
              class="rounded-full"
              @click="handleDelete('kelompok', row.original.id)"
            />
          </div>
        </template>
      </UTable>
      <div class="flex items-center justify-end space-x-4 py-4">
        <WilayahPagination
          v-model:page="queryK.page"
          :total="dKelompok ? dKelompok!.metadata.total : 1"
        />
      </div>
    </UCard>
  </div>
</template>
