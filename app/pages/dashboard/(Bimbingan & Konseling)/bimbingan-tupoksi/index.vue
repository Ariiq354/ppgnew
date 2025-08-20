<script setup lang="ts">
  const constantStore = useConstantStore();
  constantStore.setTitle("Bimbingan & Konseling / Tupoksi");
</script>

<template>
  <main>
    <Title>Bimbingan & Konseling | Tupoksi</Title>
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
                <ul>
                  <li>
                    Mengidentifikasi permasalahan permasalahan generus yang ada
                    di kelompok, siapa saja yang bermasalah dan apa permasalahan
                    nya, serta mampu merumuskan bentuk solusinya dan siapa yang
                    bisa membantu untuk memberikan solusi, dengan
                    langkah-langkah:
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ul class="list-decimal">
                  <li>
                    Membentuk tenaga konseling di tingkat desa/kelompok dan
                    melakukan pendampingan dalam memberikan layanan konsultasi.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membentuk dan memberdayakan BK kelompok untuk ikut membantu
                    Penanggung Jawab Program (PJP) kelompok dalam mencari solusi
                    dari permasalahan generus dan mendampingi musyawarah Lima
                    Unsur pembina generus di kelompok.
                  </li>
                  <li>
                    Membentuk dan memberdayakan BK desa untuk ikut membantu
                    Penanggung Jawab Program (PJP) desa dalam mencari solusi
                    dari permasalahan generus.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Mengidentifikasi permasalahan permasalahan yang timbul dalam
                    pembinaan generus.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Berkoordinasi dengan BK Desa dan Kelompok serta Penangung
                    Jawab Program (PJP) Desa dan Kelompok untuk membahas
                    permasalahan yang timbul dalam pembinaan generus dan ditulis
                    dalam Buku Solusi.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="3">
                  <li>
                    Memberikan bimbingan, motivasi dan layanan konseling kepada
                    generus, tenaga pendidik dan orang tua, agar program
                    pembinaan generus berhasil dengan optimal yang disesuai kan
                    dengan buku Garis-Garis Besar Materi dan Target Pembinaan
                    Generus.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan kegiatan parenting skill/ pelatihan ilmu
                    keorangtuaan.
                  </li>
                  <li>
                    Mengadakan bimbingan konseling orang tua belajar (BKOB).
                  </li>
                  <li>
                    Sekali waktu mengadakan kegiatan pengajian dan pembekalan
                    generus sesuai kelompok umur dengan didampingi orang tuanya,
                    contoh: pembekalan pengajian keluarga dengan cara
                    memposisikan tempat duduknya berdampingan antara bapak, ibu
                    dan anak serta memberi waktu kepada orang tua untuk
                    memberikan nasihat kepada putra-putrinya dalam forum
                    pengajian tersebut.
                  </li>
                  <li>Mengadakan pembekalan psikologi pra nikah.</li>
                  <li>
                    Bekerjasama dengan tim keluarga Bahagia untuk mengadakan
                    pembekalan keluarga harmonis usia pernikahan muda.
                  </li>
                  <li>
                    Mengadakan pembekalan psikologi bagi generus disabilitas dan
                    generus yang memerlukan pendampingan khusus.
                  </li>
                  <li>
                    Bekerjasama dengan bidang kemandirian mengadakan pembekalan
                    Talent Maping bagi generus usia pra nikah untuk menilai
                    bakat minat dalam persiapan menghadapi dunia kerja.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="4">
                  <li>
                    Melakukan sharing dan pem bekalan kepada pembina generus,
                    agar proses pembina an generus lebih optimal.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Pembekalan karakter semangat juang dan kemampuan problem
                    solving bagi pengurus PPG dan pengurus muda-mudi.
                  </li>
                  <li>
                    Pembekalan public speaking dan nasihat yang menyejukkan bagi
                    pengurus muda mudi (pelatihan konselor sebaya).
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="5">
                  <li>
                    Bekerjasama dengan ketua muballigh daerah dalam peramutan
                    muballigh/muballighot.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>Memantau kesejahteraan muballigh/ muballighot.</li>
                  <li>
                    Memantau ukhro bagi muballigh/ muballighot sesuai dengan
                    ketentuan minimal dari pusat.
                  </li>
                  <li>
                    Memantau kamar tidur yang aman dan layak bagi
                    muballigh/muballighot.
                  </li>
                  <li>
                    Mewujudkan pakaian yang baik dan pantas untuk kelayakan
                    tampil sebagai muballigh.
                  </li>
                  <li>Dan lain-lain.</li>
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
