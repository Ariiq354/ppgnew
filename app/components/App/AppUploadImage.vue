<script setup lang="ts">
  defineProps<{
    disabled: boolean;
  }>();

  const foto = defineModel<string>("foto");
  const file = defineModel<File | undefined>("file");
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
