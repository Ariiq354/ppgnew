<script setup lang="ts">
  const musyId = defineModel<number>();

  const { data, status } = await useFetch(`${APIBASE}/options/musyawarah`);
</script>

<template>
  <UCard>
    <h1 class="text-2xl font-bold sm:text-3xl">Pilih Musyawarah</h1>
    <p class="text-muted mb-8 text-sm sm:text-base">
      Silahkan pilih Musyawarah untuk absensi
    </p>
    <UFormField label="Musyawarah" size="xl">
      <USelectMenu
        v-model="musyId"
        :items="data?.data"
        :disabled="status === 'pending'"
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
</template>
