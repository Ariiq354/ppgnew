<script setup lang="ts">
  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Desa / Tupoksi");
</script>

<template>
  <main>
    <Title>PJP Desa | Tupoksi</Title>
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
              <td>
                <ul class="list-decimal">
                  <li>
                    Bertanggung jawab terhadap pelaksanaan kegiatan pembinaan
                    generus se-desa sesuai dengan program PPG yang telah
                    disusun.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan musyawaroh secara rutin dengan PJP kelompok, BK
                    desa, BK kelompok, ketua muda-mudi desa dan ketua muda-mudi
                    kelompok dengan ditunggui oleh keimaman desa.
                  </li>
                  <li>
                    Membahas permasalahan-permasalahan generus yang ada di
                    kelompok-kelompok se desa.
                  </li>
                  <li>
                    Menyampaikan hasil musyawaroh pada forum musyawaroh desa.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Mengontrol dan memberi motivasi terhadap pelaksanaan
                    pembinaan generus di kelompok.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan turba ke pengajian generus yang dilaksanakan di
                    kelompok/ gabungan beberapa kelompok.
                  </li>
                  <li>
                    Bekerjasama dengan BK Desa untuk memberi pembekalan dan
                    motivasi kepada lima unsur Pembina generus untuk
                    mengoptimalkan pembinaan generus.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="3">
                  <li>
                    Melaporkan pelaksanaan pembinaan generus saat musyawaroh
                    PPG.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mencatat pelaksanaan pembinaan generus dari tiap-tiap
                    kelompok, minimal memuat:
                    <ul class="list-[lower-alpha]">
                      <li>Tingkat kehadiran generus dalam satu bulan.</li>
                      <li>
                        Tingkat pencapaian target materi generus dalam satu
                        bulan.
                      </li>
                      <li>
                        Pemahaman dan penerapan 29 Karakter Luhur Jamaah pada
                        generus dalam satu bulan.
                      </li>
                      <li>
                        Pemahaman guru terhadap materi yang harus disampaikan
                        dalam satu bulan.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Menyampaikan permasalahan generus yang ada dalam satu bulan
                    dan belum terselesaikan di tingkat desa
                  </li>
                  <li>
                    Dianjurkan bisa membuatkan program aplikasi laporan dari
                    masing-masing penanggung jawab program (PJP) kelompok.
                  </li>
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
  ul,
  ol {
    margin-left: 1rem;
  }
</style>
