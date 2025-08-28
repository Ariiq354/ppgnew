<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";

  const constantStore = useConstantStore();
  constantStore.setTitle("Kemandirian / Tupoksi");
</script>

<template>
  <main>
    <Title>Kemandirian | Tupoksi</Title>
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
                    Mendata generus (remaja) yang telah lulus sekolah SMP/ SMA
                    dan tidak sekolah/drop out di kelompok berdasarkan bakat dan
                    minat generus.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Menyiapkan form, bekerjasama dengan sekretaris dan bidang
                    KMM.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Merencanakan dan mengadakan pelatihan kemandirian bagi para
                    generus yang disesuaikan dengan buku Garis-Garis Besar
                    Materi dan Target Pembinaan Generus.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mendata pengusaha-pengusaha, pelaku UMKM jamaah yang sukses.
                  </li>
                  <li>
                    Memberdayakan jamaah di kelompok untuk memberikan pelatihan
                    keterampilan atau magang usaha.
                  </li>
                  <li>
                    Menjalin kerja sama dengan balai latihan kerja (BLK) atau
                    pelaku usaha untuk membantu menyiapkan generus agar siap
                    bekerja, terutama bagi generus jenjang pra nikah.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="3">
                  <li>
                    Mencarikan serta meng informasikan peluang kerja kepada
                    generus.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membentuk grup WA khusus pra nikah dan selalu update info
                    lowongan kerja.
                  </li>
                  <li>
                    Mengadakan pelatihan kiat menulis surat lamaran kerja
                    professional dan siap menghadapi wawancara kerja
                    profesional.
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
