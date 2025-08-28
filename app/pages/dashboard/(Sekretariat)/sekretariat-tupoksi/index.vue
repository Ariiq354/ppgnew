<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Sekretariat / Tupoksi");
</script>

<template>
  <Title>Sekretariat | Tupoksi</Title>
  <main>
    <UCard class="p-4">
      <div>
        <h1 class="mb-4 text-center text-2xl font-bold">
          URAIAN TUGAS AMAL SHOLIH DAN CONTOH KEGIATAN
        </h1>
        <table>
          <thead>
            <tr>
              <td class="w-[50%] text-center font-semibold">
                URAIAN TUGAS AMAL SHOLIH
              </td>
              <td class="w-[50%] text-center font-semibold">CONTOH KEGIATAN</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bertanggung jawab atas administrasi PPG di daerah.</td>
              <td>
                <ul class="ml-6 flex list-disc flex-col gap-2">
                  <li>
                    Membuat database muballigh-muballighot/ tenaga pengajar yang
                    ada di tiap-tiap kelompok, dan diperbaharui secara berkala.
                  </li>
                  <li>
                    Membuat database generus berdasarkan tingkatan kelas /umur
                    yang ada di tiap-tiap kelompok, dan diperbaharui secara
                    berkala bekerja sama dengan pengurus muda mudi.
                  </li>
                  <li>
                    Membuat database terkait pelaksanaan pembinaan generus dalam
                    setiap jenjang dari setiap kelompok/tempat penyeleng- garaan
                    pembinaan generus se-daerah, yang meliputi: waktu, jumlah
                    kelas, jumlah guru, dan jumlah murid setiap kelasnya.
                  </li>
                  <li>
                    Membuat database tingkat kehadiran, ketercapaian dan
                    penguasaan target materi oleh masing-masing generus bekerja
                    sama dengan bidang kurikulum.
                  </li>
                  <li>
                    Membuat perangkat pembelajaran bekerja sama dengan bidang
                    kurikulum.
                  </li>
                  <li>
                    Membuat jadwal turba pengurus PPG pada musyawaroh Lima Unsur
                    dengan memprioritaskan kelompok-kelompok yang musyawaroh
                    Lima Unsurnya kurang optimal.
                  </li>
                  <li>Mencatat hasil msusyawarah PPG.</li>
                  <li>Serta administrasi lain yang diperlukan.</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </main>
</template>

<style scoped>
  td {
    border-width: 1px;
    padding: 0.5rem;
    padding-left: 1rem;
  }
</style>
