<script setup lang="ts">
  const constantStore = useConstantStore();
  constantStore.setTitle("Kurikulum / Tupoksi");
</script>

<template>
  <main>
    <Title>Kurikulum | Tupoksi</Title>
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
                    Menyusun program tahunan, program semester dan program
                    bulanan, dalam bentuk cetak atau perangkat lunak (software)
                    untuk pembinaan generus mengacu pada buku Garis Garis Besar
                    Materi dan Target Pembinaan Generus.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membuat kelompok materi yang dapat dimasukkan ke dalam
                    jadwal pelajaran harian, contoh:
                    <ul class="list-[lower-alpha]">
                      <li>
                        Jenjang caberawit, materi dikelompokkan menjadi 4,
                        yaitu:
                        <ul class="list-[square]">
                          <li>
                            Nasihat: materi dasar keagamaan, kefahaman agama,
                            akhlaqul karimah
                          </li>
                          <li>
                            Hafalan: do&apos;a-do&apos;a harian, surat-surat
                            pendek al-Qur&apos;an.
                          </li>
                          <li>Baca tulis: Iqro&apos;/Tilawati dan pegon.</li>
                          <li>
                            Praktik ibadah dan simulasi: praktik ibadah,
                            adab/tatakrama dan kemandirian.
                          </li>
                        </ul>
                      </li>
                      <li>
                        Jenjang pra remaja, remaja dan pra nikah, materi
                        dikelompokkan menjadi 4, yaitu:
                        <ul class="list-[square]">
                          <li>
                            Nasihat: materi dasar keagamaan, kefahaman agama dan
                            akhlaqul karimah.
                          </li>
                          <li>
                            Bacaan: pemangkulan dan penyimakan bacaan
                            al-Qur&apos;an.
                          </li>
                          <li>
                            Makna arti dan keterangan: pemangkul an dan
                            penyimakan makna al-Qur&apos;an dan himpunan.
                          </li>
                          <li>
                            Praktik ibadah dan simulasi: praktik ibadah,
                            adab/tatakrama dan kemandirian.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Menyosialisasikan semua program kepada penanggung jawab
                    program tingkat desa, tingkat kelompok, tenaga pengajar dan
                    Lima Unsur Pembina Generus.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membuat jadwal sosialisasi program pembinaan yang telah
                    dibuat, dengan mempertimbangkan efektifitas penerimaan dan
                    pemahaman dari peserta.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="3">
                  <li>
                    Membuat evaluasi program pembinaan generus secara berkala.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membuat buku/lembar evaluasi pelaksanaan pembinaan generus
                    sesuai dengan perencanaan yang telah dibuat, meliputi:
                    kehadiran, penuntasan dan pemahaman materi, serta praktik
                    keseharian.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="4">
                  <li>Menindaklanjuti hasil evaluasi.</li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan musyawaroh tindak lanjut terhadap hasil evaluasi
                    bekerjasama dengan bid. tenaga pendidik, bid. KMM, bid. BK
                    dan bidang lain yang terkait.
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
