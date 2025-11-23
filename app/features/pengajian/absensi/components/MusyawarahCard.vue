<script setup lang="ts">
  const kelasId = defineModel<number>();

  const { data, status } = await useFetch(`${APIBASE}/options/pengajian`);
</script>

<template>
  <UCard>
    <h1 class="text-2xl font-bold sm:text-3xl">Pilih Pengajian</h1>
    <p class="text-muted mb-8 text-sm sm:text-base">
      Silahkan pilih Pengajian untuk absensi
    </p>
    <UFormField label="Pengajian" size="xl">
      <USelectMenu
        v-model="kelasId"
        :items="data?.data"
        :disabled="status === 'pending'"
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
</template>
