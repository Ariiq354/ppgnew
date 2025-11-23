<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";
  import { bulanFilterOptions } from "~~/shared/constants";
  import { bulanOptions, tahunOptions } from "./_constants";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Desa / Laporan Muslimun");

  const query = reactive({
    tahun: "",
    bulan: "",
  });
  const { data, status, refresh } = await useFetch(
    `${APIBASE}/muslimun/laporan/desa`,
    {
      query,
      immediate: false,
      watch: false,
    }
  );
  watch(
    () => [query.tahun, query.bulan],
    () => {
      if (query.tahun && query.bulan) {
        refresh();
      }
    }
  );

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
  <Title>PJP Desa | Laporan Muslimun</Title>
  <LazyUModal
    v-model:open="modalOpen"
    title="Detail Laporan Musyawarah"
    class="max-w-4xl"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <h1 class="text-xl font-bold">{{ stateView.laporan }}</h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="prose prose-base" v-html="stateView.keterangan" />
      </div>
    </template>
  </LazyUModal>
  <main class="flex flex-col gap-4">
    <UCard>
      <h1 class="text-2xl font-bold sm:text-3xl">Pilih Musyawarah</h1>
      <p class="text-muted mb-8 text-sm sm:text-base">
        Silahkan pilih Musyawarah untuk melihat laporan
      </p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UFormField label="Tahun" size="xl">
          <USelectMenu
            v-model="query.tahun"
            :items="tahunOptions"
            placeholder="Pilih Tahun"
          />
        </UFormField>
        <UFormField label="Bulan" size="xl">
          <USelectMenu
            v-model="query.bulan"
            :items="bulanOptions"
            value-key="value"
            label-key="name"
            placeholder="Pilih Bulan"
          />
        </UFormField>
      </div>
    </UCard>
    <UCard v-if="!query.tahun || !query.bulan">
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
        <UIcon name="i-lucide-calendar" size="20" />Laporan Muslimun
      </h1>
      <p class="text-muted mt-1 mb-4 text-sm">
        {{
          "Tahun " +
          query.tahun +
          " Bulan " +
          bulanFilterOptions.find((i) => i.value === Number(query.bulan))?.name
        }}
        • {{ Object.keys(data!.data).length }} kelompok •
        {{
          Object.values(data!.data).reduce((sum, arr) => sum + arr.length, 0)
        }}
        laporan
      </p>
      <div class="flex flex-col gap-4">
        <div v-for="[key, value] in Object.entries(data!.data)" :key="key">
          <div class="flex items-center gap-2">
            <UBadge variant="subtle" class="rounded-full" size="lg">
              {{ key }}
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
