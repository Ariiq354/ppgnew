<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Penggalang Dana / Tupoksi");
</script>

<template>
  <main>
    <Title>Penggalang Dana | Tupoksi</Title>
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
                    Mengadakan kegiatan penggalian dana dari orang tua/ wali
                    generus, aghniyak, dan pihak lain yang tidak mengikat untuk
                    kelancaran semua kegiatan PPG dan pembinaan generus sesuai
                    dengan perencanaan anggaran yang telah disusun oleh
                    masing-masing bidang atas seizin keimaman.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan shodaqoh rutin dari semua jamaah yang khusus
                    dialokasikan untuk kegiatan PPG dan pembinaan generus.
                  </li>
                  <li>
                    Mengadakan shodaqoh gebrakan dan mencari sponsor saat akan
                    dilaksanakan event kegiatan besar dari program tahunan,
                    contoh: saat akan CAI, saat akan melaksanakan festival
                    generus, saat akan mengadakan expo/bazar, dan lain-lain.
                  </li>
                  <li>
                    Menggali dana dari perusahaan jamaah melalui program
                    sponsorship atau bantuan sosial.
                  </li>
                  <li>
                    Bekerjasama dengan bidang kemandirian membuat kegiatan yang
                    produktif untuk menopang pembiayaan pelaksanaan program PPG.
                    contoh: gerakan tanam pisang, membeli kebun sawit atau
                    karet, menyewa sawah/kebun, berjualan tempe, menghimpun
                    barang layak jual, memproduksi makanan dan minuman dll.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Berupaya secara maksimal agar semua kegiatan yang telah
                    direncanakan bisa terlaksana.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Seizin keimaman daerah, membantu menyukseskan program
                    penggalangan dana dengan tetap mengikuti mekanisme keuangan
                    dalam jamaah.
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
