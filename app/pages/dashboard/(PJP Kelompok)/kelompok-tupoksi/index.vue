<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("PJP Kelompok / Tupoksi");
</script>

<template>
  <Title>PJP Kelompok | Tupoksi</Title>
  <main>
    <UCard class="p-4">
      <div>
        <h1 class="mb-4 text-center text-lg font-bold md:text-2xl">
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
                    generus di kelompok sesuai dengan program PPG yang telah
                    disusun.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Memastikan berjalannya kegiatan pembinaan generus sesuai
                    dengan jadwal yang telah ditentukan.
                  </li>
                  <li>
                    Memastikan terpenuhinya kelas dan guru generus sesuai dengan
                    kondisi real generus di kelompok.
                  </li>
                  <li>
                    Memastikan terpenuhinya sarana dan pra sarana yang
                    dibutuhkan untuk meng optimalkan berjalannya pembinaan
                    generus.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Berkoordinasi dengan Lima Unsur Pembina Generus terkait
                    dengan pembinaan generus.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Memotivasi muballigh setempat (MS) untuk ikut berperan aktif
                    secara langsung pada pembinaan generus.
                  </li>
                  <li>
                    Membantu komunikasi dengan keimaman untuk suksesnya
                    pembinaan generus, seperti acara keakraban generus, terutama
                    terkait dengan kebutuhan dana.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="3">
                  <li>Mengupayakan pencapaian target kurikulum.</li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Memotivasi muballigh tugasan (MT), muballigh setempat (MS)
                    dan guru mengaji untuk semangat dalam melaksanakan pengajian
                    sesuai dengan perencanaan yang telah dibuat oleh bidang
                    kurikulum PPG dengan mengisi perangkat pembelajaran, seperti
                    buku kehadiran/presensi, buku jurnal, buku prestasi, dan
                    lain-lain.
                  </li>
                  <li>
                    Memotivasi dan orang tua generus untuk ikut nderesi
                    putra-putrinya dan nasihati putra-putrinya untuk penerapan
                    29 Karakter Luhur Jamaah.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="4">
                  <li>
                    Melaksanakan evaluasi terhadap pencapaian target kurikulum.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Bekerja sama dengan para muballigh muballighot untuk
                    menyusun instrumen evaluasi, contoh: pencapaian hafalan,
                    penghataman bacaan, penghataman makna al-Qur&apos;an, dan
                    lain-lain.
                  </li>
                  <li>
                    Membantu muballigh-muballighot dalam pengisian administrasi
                    pembelajaran, misal: merekap kehadiran, mengisi raport hasil
                    pembelajaran, dan lain-lain.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="5">
                  <li>
                    Melaporkan hasil kegiatan belajar-mengajar kepada penanggung
                    jawab program tingkat desa.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mencatat pelaksanaan pembinaan generus, minimal memuat:
                    <ul class="list-[lower-alpha]">
                      <li>Tingkat kehadiran generus dalam satu bulan.</li>
                      <li>
                        Tingkat pencapaian target materi generus dalam satu
                        bulan
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
                    Menyampaikan permasalahan generus yang muncul dalam satu
                    bulan dan belum terselesaikan di tingkat kelompok pada
                    musyawaroh penanggung jawab program (PJP) desa.
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
