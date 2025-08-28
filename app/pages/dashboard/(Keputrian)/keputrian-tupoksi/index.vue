<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Keputrian / Tupoksi");
</script>

<template>
  <main>
    <Title>Keputrian | Tupoksi</Title>
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
                    Merencanakan dan mengadakan pelatihan untuk mempersiapkan
                    generus putri menjadi generus yang sholihah.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan pembekalan terkait masalah thoharoh, contoh:
                    mengenal najis, haid, nifas, istihadhoh, kapan berhenti
                    sholat dari haid, kapan memulai sholat setelah haid.
                  </li>
                  <li>
                    Mengadakan pembekalan terkait tata cara berpakaian yang
                    syar&apos;i.
                  </li>
                  <li>
                    Mengadakan pembekalan terkait tata cara berhias yang
                    syar&apos;i.
                  </li>
                  <li>
                    Mengadakan pembekalan terkait cara bergaul, bertutur kata,
                    berinteraksi dengan sesama perempuan maupun lawan jenis baik
                    secara langsung maupun melalui media sosial.
                  </li>
                  <li>
                    Mengadakan pembekalan terkait keinginan dan kesiapan menikah
                    serta memiliki keturunan.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Merencanakan dan mengadakan pelatihan untuk mempersiapkan
                    generus putri menjadi calon istri yang sholihah.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan pembekalan terkait tatakrama bertutur kata
                    terhadap suami.
                  </li>
                  <li>
                    Mengadakan pembekalan terkait tatakrama dalam melayani
                    suami, contoh: melayani makanan, melayani minuman, melayani
                    pakaian, melayani kebutuhan biologis.
                  </li>
                  <li>
                    Mengadakan pembekalan terkait pekerjaan rumah seperti:
                    kebersihan rumah, kerapihan penataan perabot rumah atau
                    perlengkapan dapur, mencuci baju, menyeterika baju,
                    menempatkan baju.
                  </li>
                  <li>
                    Mengadakan pembekalan terkait memasak menu keluarga harian,
                    seperti: bisa membuat macam-macam menu masakan rumahan,
                    membuat macam-macam kue/jajanan yang sehat.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="3">
                  <li>
                    Merencanakan dan mengadakan pelatihan untuk mempersiapkan
                    generus putri menjadi calon ibu yang sholihah.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan pembekalan terkait persiapan fisik dan mental
                    dalam menghadapi masa masa kehamilan, menyusui dan perawatan
                    bayi.
                  </li>
                  <li>
                    Mengadakan pembekalan terkait kecukupan gizi bagi ibu dan
                    bayi untuk mencegah stunting.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="4">
                  <li>
                    Memberikan pembekalan kemandirian kepada generus putri
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan seminar/ workshop kewirausahaan bagi remaja putri
                    yang dipandu oleh ahlinya atau pelaku usaha yang sukses,
                    khususnya usaha-usaha yang bisa dikerjakan di rumah.
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
