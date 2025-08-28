<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Olahraga & Seni / Tupoksi");
</script>

<template>
  <main>
    <Title>Olahraga & Seni | Tupoksi</Title>
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
                    Menyusun program olah raga dan seni (yang tidak ber
                    tentangan dengan Syari&apos;at), bekerja sama dengan bidang
                    kurikulum, bidang KMM dan bidang-bidang lain yang
                    diperlukan.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membuat program latihan pencak silat ASAD pada semua jenjang
                    generus,
                  </li>
                  <li>
                    Membuat program latihan sepak bola atau futsal serta olah
                    raga lain yang memungkin- kan, seperti: senam barokah,
                    badminton, tenis meja, basket, sepak takraw, dan lain-lain.
                  </li>
                  <li>
                    Membuat komunitas untuk mewadahi generus dalam menyalurkan
                    hobinya dengan sesama jamaah.
                  </li>
                  <li>
                    Membuat program pelatihan seni baca al Qur&apos;an, khod
                    (menulis Arab yang bagus) dan seni kaligrafi.
                  </li>
                  <li>
                    Berkoordinasi dengan bidang sarpras untuk mewujudkan sarana
                    dan pra sarana olah raga dan seni yang diperlukan sesuai
                    dengan kemampuan.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Membuat program pelatihan bagi para muballigh/muballighot
                    untuk mendesain pembelajaran yang menyenangkan.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>Mengadakan pelatihan BCM (bermain cerita-menyanyi).</li>
                  <li>
                    Mengadakan pelatihan membuat ice breaking saat pembelajaran,
                    seperti: belajar macam-macam tepuk, menyisipkan olah raga
                    ringan di tengah-tengah acara pengajian, belajar membuat
                    video untuk refleksi 29 Karakter Luhur Jamaah, dll.
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
