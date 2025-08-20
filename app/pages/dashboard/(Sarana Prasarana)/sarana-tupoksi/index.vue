<script setup lang="ts">
  const constantStore = useConstantStore();
  constantStore.setTitle("Sarana Prasarana / Tupoksi");
</script>

<template>
  <main>
    <Title>Sarana Prasarana | Tupoksi</Title>
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
                    Merancang standar minimal sarana dan prasarana yang harus
                    disediakan untuk kegiatan pembinaan generus di kelompok.
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Membuat standar luas ruangan yang layak, lampu penerangan
                    yang mencukupi serta sirkulasi udara yang nyaman untuk
                    mengaji
                  </li>
                  <li>
                    Membantu menyiapkan meja guru, dampar, papan tulis, spidol
                    dan penghapus.
                  </li>
                  <li>
                    Memberikan masukan kepada tim bangunan akan kebutuhan kamar
                    mandi dan kran wudhu yang ideal untuk generus.
                  </li>
                  <li>
                    Menyediakan peralatan untuk membuat alat peraga pembelajaran
                    29 Karakter Luhur Jamaah.
                  </li>
                  <li>
                    Bekerjasama dengan Lima Unsur untuk mewujudkan sarana pra
                    sarana yang telah dirancang serta perawatannya.
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ol class="list-decimal" start="2">
                  <li>
                    Membuat daftar inventaris sarana dan prasarana yang ada di
                    tiap-tiap Kelompok, dan mengadakan pengecekan secara
                    berkala.
                  </li>
                </ol>
              </td>
              <td>
                <ul class="list-disc">
                  <li>
                    Menyiapkan form evaluasi daftar inventaris sarana dan
                    prasarana yang ada di tiap-tiap Kelompok.
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
