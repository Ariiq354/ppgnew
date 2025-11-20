<script setup lang="ts">
  const kelompokId = defineModel<number | undefined>();

  const props = defineProps<{
    desaId: number | undefined;
  }>();

  const desaId = toRef(() => props.desaId);

  const { data: dataKelompok, status: statusKelompok } = await useFetch(
    `${APIBASE}/options/kelompok`,
    {
      query: {
        desaId,
      },
    }
  );

  watch(desaId, () => {
    kelompokId.value = undefined;
  });
</script>

<template>
  <ClearableSelectMenu
    v-model="kelompokId"
    placeholder="Kelompok"
    :items="dataKelompok?.data"
    value-key="id"
    label-key="name"
    :loading="statusKelompok === 'pending'"
  />
</template>
