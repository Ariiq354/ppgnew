<script setup lang="ts">
  const props = defineProps<{
    disabled: boolean;
    foto: string | undefined;
    file?: File | undefined;
  }>();

  const emit = defineEmits<{
    "update:foto": [string | undefined];
    "update:file": [File | undefined];
  }>();

  const foto = computed({
    get: () => props.foto,
    set: (value) => emit("update:foto", value),
  });

  const file = computed({
    get: () => props.file,
    set: (value) => emit("update:file", value),
  });
</script>

<template>
  <div v-if="foto" class="relative w-40">
    <NuxtImg :src="foto" class="aspect-square w-40 rounded-lg"> </NuxtImg>
    <UButton
      v-if="!disabled"
      icon="i-lucide-x"
      color="neutral"
      :ui="{ leadingIcon: 'size-4' }"
      class="p-1/2 absolute -end-1.5 -top-1.5 rounded-full text-xs"
      @click="foto = ''"
    />
  </div>
  <UFileUpload
    v-else
    v-model="file"
    highlight
    color="neutral"
    icon="i-lucide-image"
    :description="!disabled ? 'max. 5MB' : undefined"
    class="aspect-square w-40"
    :disabled="disabled"
  />
</template>
