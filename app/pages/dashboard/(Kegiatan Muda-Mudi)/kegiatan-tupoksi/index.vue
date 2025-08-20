<script setup lang="ts">
  const constantStore = useConstantStore();
  constantStore.setTitle("Kegiatan Muda-Mudi / Tupoksi");
</script>

<template>
  <main>
    <Title>Kegiatan Muda-Mudi | Tupoksi</Title>
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
                    Memiliki database/biodata muda-mudi (pra remaja, remaja dan
                    pra nikah).
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Menyiapkan form untuk dapat diisi oleh semua muda-mudi,
                    misal : membuat google form, membentuk tenaga IT di
                    tiap-tiap kelompok untuk membantu kesuksesan penyusunan
                    database muda-mudi.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Menyusun program kegiatan ekstra kulikuler muda-mudi (pra
                    remaja, remaja dan pra nikah).
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Mengadakan pengajian muda-mudi di tingkat daerah dan desa.
                  </li>
                  <li>Mengadakan camping CAI secara outdoor/ indoor.</li>
                  <li>
                    Bekerja sama dengan bidang olahraga dan seni mengadakan
                    kompetisi olah raga.
                  </li>
                  <li>
                    Mengadakan acara penggemblengan pengurus muda-mudi, melalui
                    acara: outing class, outbond, boothcamp, kepramukaan, dan
                    lain-lain.
                  </li>
                  <li>
                    Mengadakan kegiatan seminar atau workshop yang berkaitan
                    dengan kemandirian bagi muda-mudi terutama bagi muda-mudi
                    usia mandiri.
                  </li>
                  <li>
                    Mengadakan pembekalan persiapan pernikahan bagi remaja
                    jenjang pra nikah bekerja sama dengan bidang BK atau Tim
                    Pernikahan.
                  </li>
                  <li>
                    Mengadakan acara keakraban yang dikemas semenarik mungkin
                    untuk melancarkan pernikahan antar generus dalam jamaah,
                    contoh: acara masak-memasak yang dikemas melibatkan
                    muda-mudi usia nikah, anjangsana antar daerah, mengadakan
                    sparing olah raga dengan melibatkan sporter dari remaja
                    putri, dan lain-lain.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="3">
                  <li>
                    Melaksanakan turba pengurus muda-mudi daerah ke pengajian
                    muda-mudi desa.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membuat jadwal pelaksanaan turba serta materi yang akan
                    disampaikan.
                  </li>
                  <li>Berkoordinasi dengan keimaman desa terlebih dahulu.</li>
                  <li>Melaporkan hasil turba kepada keimaman daerah.</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="4">
                  <li>
                    Mengontrol kelengkapan kepengurusan muda-mudi di tingkat
                    desa dan kelompok.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Berkoordinasi dengan keimaman desa dan kelompok tentang
                    kepengurusan muda mudi.
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
