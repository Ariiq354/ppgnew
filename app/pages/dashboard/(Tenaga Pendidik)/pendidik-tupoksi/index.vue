<script setup lang="ts">
  const constantStore = useConstantStore();
  constantStore.setTitle("Tenaga Pendidik / Tupoksi");
</script>

<template>
  <main>
    <Title>Tenaga Pendidik | Tupoksi</Title>
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
                    Menghimpun data tenaga pengajar (mubaligh/mubalighot tugasan
                    (MT) maupun setempat (MS).
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mempunyai database MT dan MS yang aktif mengajar generus.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Menyediakan tenaga pengajar secara kuantitas dan kualitas
                    untuk tiap-tiap kelompok, agar kurikulum berjalan dengan
                    baik.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Memberdayakan jamaah selain MT/MS untuk bisa menyampaikan
                    materi tertentu, misal: materi adab/tatakrama, materi
                    kemandirian.
                  </li>
                  <li>
                    Menjalin komunikasi dengan ketua muballigh daerah untuk
                    mempersiapkan calon pengganti MT yang akan purna tugas.
                  </li>
                  <li>Menyiapkan asisten dari generus.</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="3">
                  <li>
                    Menyusun dan melaksanakan program peningkatan SDM tenaga
                    pengajar.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Memberikan pembekalan terhadap MT yang baru sebelum menggan
                    ikan tugas MT yang purna.
                  </li>
                  <li>
                    Mengadakan asrama pemangkulan/ penderesan al-Qur&apos;an dan
                    al-Hadits, pelatihan Iqro&apos;/ tilawaty, mengadakan
                    pelatihan teknik mengajar yang efektif dan menyenangkan,
                    pelatihan mengenal psikologi anak dan teknik komunikasi,
                    mengadakan pelatihan teknik penggambuhan pada generus, dan
                    lain-lain.
                  </li>
                  <li>
                    Memberikan kesempatan kepada MT untuk mengikuti program
                    pengajian hadits besar dengan dibiayai oleh daerah.
                  </li>
                  <li>
                    Memberikan kesempatan kepada MT untuk kuliah dengan diberi
                    subsidi.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="4">
                  <li>
                    Mengoptimalkan amal sholih nya para muballigh/muballighot
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membuat agenda kegiatan harian bagi muballigh/muballighot
                    dalam mengajar generus, memberikan keteladan ibadah dan
                    akhlaqul karimah.
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
