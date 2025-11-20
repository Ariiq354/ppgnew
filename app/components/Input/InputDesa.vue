<script setup lang="ts">
  const desaId = defineModel<number | undefined>();

  const props = defineProps<{
    daerahId: number | undefined;
  }>();

  const daerahId = toRef(() => props.daerahId);

  const { data: dataDesa, status: statusDesa } = await useFetch(
    `${APIBASE}/options/desa`,
    {
      query: {
        daerahId,
      },
    }
  );

  watch(
    () => daerahId,
    () => {
      desaId.value = undefined;
    }
  );
</script>

<template>
  <ClearableSelectMenu
    v-model="desaId"
    placeholder="Desa"
    :items="dataDesa?.data"
    value-key="id"
    label-key="name"
    :loading="statusDesa === 'pending'"
  />
</template>
