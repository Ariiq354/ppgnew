<script setup lang="ts">
  import type { NuxtError } from "#app";

  interface errorMessage {
    [id: string]: {
      name: string;
      message: string;
    };
  }

  defineProps<{
    error: NuxtError;
  }>();

  const statusMessage: errorMessage = {
    "404": {
      name: "Halaman tidak ditemukan",
      message:
        "Oops! Kami tidak dapat menemukan halaman yang Anda cari. Mungkin telah dipindahkan atau dihapus.",
    },
    "401": {
      name: "Tidak terotorisasi",
      message:
        "Oops! Sepertinya Anda perlu masuk untuk mengakses halaman ini. Silakan periksa kredensial Anda dan coba lagi.",
    },
    "403": {
      name: "Dilarang",
      message:
        "Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Jika Anda yakin ini adalah kesalahan, silakan hubungi dukungan.",
    },
    "500": {
      name: "Kesalahan server internal",
      message:
        "Uh-oh! Ada yang salah di sistem kami. Kami sedang bekerja keras untuk memperbaikinya. Silakan coba lagi nanti.",
    },
  };
</script>

<template>
  <div
    id="errorpage"
    class="flex min-h-screen flex-col items-center justify-center"
  >
    <h1 class="text-primary font-semibold">
      {{ error?.statusCode }}
    </h1>
    <p
      class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white"
    >
      {{ statusMessage[String(error?.statusCode)]?.name }}
    </p>
    <p
      class="mt-6 max-w-lg text-center text-base/7 text-gray-500 dark:text-gray-400"
    >
      {{ statusMessage[String(error?.statusCode)]?.message }}
    </p>

    <UButton
      to="/"
      size="lg"
      class="mt-10 flex items-center justify-center gap-x-6"
    >
      Go Back Home
    </UButton>
  </div>
</template>
