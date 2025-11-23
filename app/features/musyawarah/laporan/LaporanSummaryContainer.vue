<script setup lang="ts">
  import { BidangDisplay } from "~~/shared/permission";
  import ViewLaporanModal from "./components/ViewLaporanModal.vue";

  const musyId = ref<number>();
  const { data: musyOption, status: statusMusy } = await useFetch(
    `${APIBASE}/options/musyawarah`
  );
  const musyawarah = computed(() =>
    musyOption.value?.data.find((i) => i.id === musyId.value)
  );

  const { data, status, refresh } = await useFetch(
    `${APIBASE}/musyawarah/laporan/summary`,
    {
      query: {
        musyawarahId: musyId,
      },
      immediate: false,
    }
  );
  watchOnce(musyId, () => refresh());

  const modalOpen = ref(false);
  const stateView = ref();

  function clickView(itemData: { laporan: string; keterangan: string }) {
    modalOpen.value = true;
    stateView.value = {
      keterangan: itemData.keterangan,
      laporan: itemData.laporan,
    };
  }
</script>

<template>
  <ViewLaporanModal v-model:open="modalOpen" :data="stateView" />
  <main class="flex flex-col gap-4">
    <UCard>
      <h1 class="text-2xl font-bold sm:text-3xl">Pilih Musyawarah</h1>
      <p class="text-muted mb-8 text-sm sm:text-base">
        Silahkan pilih Musyawarah untuk melihat laporan
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
    <UCard v-if="!musyId">
      <div class="flex flex-col items-center justify-center gap-4 py-16">
        <UIcon name="i-lucide-user-check" size="50" />
        <h2 class="text-xl font-bold">Pilih Musyawarah</h2>
        <p class="text-muted text-center">
          Silahkan pilih musyawarah di menu diatas untuk melihat summary
        </p>
      </div>
    </UCard>
    <UCard v-else-if="status === 'pending'">
      <div
        class="text-muted flex flex-col items-center justify-center gap-4 py-16"
      >
        <UIcon name="i-lucide-loader-circle" size="50" class="animate-spin" />
        <h2 class="text-xl">Loading</h2>
      </div>
    </UCard>
    <UCard v-else-if="Object.keys(data!.data).length === 0">
      <div
        class="text-muted flex flex-col items-center justify-center gap-4 py-16"
      >
        <UIcon name="i-lucide-file-text" size="50" />
        <h2 class="text-xl">Tidak ada laporan untuk musyawarah ini</h2>
      </div>
    </UCard>
    <UCard v-else>
      <h1
        class="flex items-center gap-2 text-2xl leading-none font-bold tracking-tight"
      >
        <UIcon name="i-lucide-calendar" size="20" />{{ musyawarah?.nama }}
      </h1>
      <p class="text-muted mt-1 mb-4 text-sm">
        {{
          new Date(musyawarah!.tanggal).toLocaleDateString("id-ID", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        }}
        • {{ Object.keys(data!.data).length }} bidang •
        {{
          Object.values(data!.data).reduce((sum, arr) => sum + arr.length, 0)
        }}
        laporan
      </p>
      <div class="flex flex-col gap-4">
        <div v-for="[key, value] in Object.entries(data!.data)" :key="key">
          <div class="flex items-center gap-2">
            <UBadge variant="subtle" class="rounded-full" size="lg">
              {{ BidangDisplay[key as keyof typeof BidangDisplay] }}
            </UBadge>
            <p>{{ value.length }} Laporan</p>
          </div>
          <div
            v-for="(item, i) in value"
            :key="i"
            class="border-muted bg-muted mt-2 ml-2 rounded-md border p-2 text-lg font-bold transition-all duration-300 hover:shadow-md"
            @click="clickView(item)"
          >
            {{ item.laporan }}
          </div>
        </div>
      </div>
    </UCard>
  </main>
</template>
