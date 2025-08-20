<script setup lang="ts">
  const constantStore = useConstantStore();

  onMounted(() => {
    constantStore.setTitle("Sekretariat / Tupoksi");
  });
</script>

<template>
  <Title>Sekretariat | Tupoksi</Title>
  <main>
    <UCard class="p-4">
      <div>
        <h1 class="mb-4 text-center text-2xl font-bold uppercase">
          Bertanggung jawab atas administrasi PPG di daerah
        </h1>
        <ul
          class="ml-6 grid list-disc grid-cols-1 gap-8 text-xl md:grid-cols-2"
        >
          <li>
            Membuat database muballigh-muballighot/ tenaga pengajar yang ada di
            tiap-tiap kelompok, dan diperbaharui secara berkala.
          </li>
          <li>
            Membuat database generus berdasarkan tingkatan kelas /umur yang ada
            di tiap-tiap kelompok, dan diperbaharui secara berkala bekerja sama
            dengan pengurus muda mudi.
          </li>
          <li>
            Membuat database terkait pelaksanaan pembinaan generus dalam setiap
            jenjang dari setiap kelompok/tempat penyeleng- garaan pembinaan
            generus se-daerah, yang meliputi: waktu, jumlah kelas, jumlah guru,
            dan jumlah murid setiap kelasnya.
          </li>
          <li>
            Membuat database tingkat kehadiran, ketercapaian dan penguasaan
            target materi oleh masing-masing generus bekerja sama dengan bidang
            kurikulum.
          </li>
          <li>
            Membuat perangkat pembelajaran bekerja sama dengan bidang kurikulum.
          </li>
          <li>
            Membuat jadwal turba pengurus PPG pada musyawaroh Lima Unsur dengan
            memprioritaskan kelompok-kelompok yang musyawaroh Lima Unsurnya
            kurang optimal.
          </li>
          <li>Mencatat hasil msusyawarah PPG.</li>
          <li>Serta administrasi lain yang diperlukan.</li>
        </ul>
      </div>
    </UCard>
  </main>
</template>

<style scoped>
  td {
    border-width: 1px;
    padding: 0.5rem;
  }
</style>
