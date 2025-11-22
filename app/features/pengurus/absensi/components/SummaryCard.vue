<script setup lang="ts">
  const { absensi } = defineProps<{
    absensi: { keterangan: string }[] | undefined;
    memberCount: number | undefined;
  }>();

  const hadirCount = computed(() =>
    absensi?.reduce((a, i) => {
      return a + (i.keterangan === "Hadir" ? 1 : 0);
    }, 0)
  );
  const izinCount = computed(() =>
    absensi?.reduce((a, i) => {
      return a + (i.keterangan === "Izin" ? 1 : 0);
    }, 0)
  );
</script>

<template>
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
        {{ (memberCount ?? 0) - (hadirCount ?? 0) - (izinCount ?? 0) }}
      </p>
      <p class="text-muted">Tanpa Keterangan</p>
    </UCard>
    <UCard>
      <p class="text-4xl font-bold">{{ memberCount }}</p>
      <p class="text-muted">Total</p>
    </UCard>
  </div>
</template>
