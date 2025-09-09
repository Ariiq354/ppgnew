<script setup lang="ts">
  import { useAuthStore } from "~/stores/auth";
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const sekretariatManage = authStore.hasPermission({
    sekretariat: ["manage"],
  });
  constantStore.setTitle("Sekretariat / Laporan");

  const musyId = ref<number>();
  const { data: musyOption, status: statusMusy } = await useFetch(
    `${APIBASE}/options/musyawarah`
  );
</script>

<template>
  <Title>Sekretariat | Laporan</Title>
  <main class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <UCard class="md:col-span-2">
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

      <div class="mt-8 flex flex-col gap-4">
        <UFormField label="Judul" size="xl">
          <UInput placeholder="Masukkan judul untuk laporan ini" />
        </UFormField>
        <UFormField label="Judul" size="xl">
          <UTextarea placeholder="Judul" :rows="20" />
        </UFormField>
      </div>
      <div class="mt-8 flex w-full justify-end">
        <UButton icon="i-lucide-save">Simpan Laporan</UButton>
      </div>
    </UCard>
    <UCard class="h-fit">
      <h1 class="text-2xl font-bold sm:text-3xl">Daftar Laporan</h1>
      <p v-if="!musyId" class="text-muted mb-8 text-sm sm:text-base">
        Pilih musyawarah untuk melihat laporan
      </p>
      <div class="flex items-center justify-center"></div>
    </UCard>
  </main>
</template>
