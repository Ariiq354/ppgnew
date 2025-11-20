<script setup lang="ts">
  const { data } = await useFetch(`${APIBASE}/home/kelas69`);

  async function getPdf() {
    window.open(`${APIBASE}/home/kelas69Pdf`, "_blank");
  }
</script>

<template>
  <main>
    <UCard class="mb-4">
      <UButton size="xl" @click="getPdf"> Download PDF </UButton>
    </UCard>
    <UCard>
      <div class="flex justify-center">
        <div ref="content" class="content w-fit px-38 py-12">
          <div
            class="mx-auto mb-4 w-full max-w-120 text-center text-xl font-bold"
          >
            PENDATAAN SISWA KELAS 6 SD dan KELAS 9 SMP PPDB TA 2024/2025 PPPM
            DAARUL HUFFADZ
          </div>
          <table class="mx-auto border-collapse">
            <thead>
              <tr>
                <td rowspan="2" class="text-center">NO</td>
                <td rowspan="2" class="w-72 text-center">KELOMPOK</td>
                <td colspan="2" class="text-center">SD KELAS 6</td>
                <td colspan="2" class="text-center">SMP KELAS 9</td>
                <td rowspan="2" class="text-center">TOTAL</td>
              </tr>
              <tr>
                <td class="text-center">(L)</td>
                <td class="text-center">(P)</td>
                <td class="text-center">(L)</td>
                <td class="text-center">(P)</td>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in data?.data.desa" :key="index">
                <tr>
                  <td colspan="7" class="font-bold">{{ item.name }}</td>
                </tr>
                <tr
                  v-for="(item2, index2) in data?.data.kelompok.filter(
                    (i) => i.desaId === item.id
                  )"
                  :key="index2"
                >
                  <td class="text-center">{{ index2 + 1 }}</td>
                  <td>{{ item2.name }}</td>
                  <td class="text-center">
                    {{ data?.data.kelompokCounts[item2.id]?.countLaki6 ?? 0 }}
                  </td>
                  <td class="text-center">
                    {{
                      data?.data.kelompokCounts[item2.id]?.countPerempuan6 ?? 0
                    }}
                  </td>
                  <td class="text-center">
                    {{ data?.data.kelompokCounts[item2.id]?.countLaki9 ?? 0 }}
                  </td>
                  <td class="text-center">
                    {{
                      data?.data.kelompokCounts[item2.id]?.countPerempuan9 ?? 0
                    }}
                  </td>
                  <td class="text-center">
                    {{
                      Object.values(
                        data?.data.kelompokCounts[item2.id] ?? {}
                      ).reduce((a, i) => (a += i), 0)
                    }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-center font-bold">Subtotal</td>
                  <td class="text-center font-bold">
                    {{ data?.data.desaCounts[item.id]?.countLaki6 ?? 0 }}
                  </td>
                  <td class="text-center font-bold">
                    {{ data?.data.desaCounts[item.id]?.countPerempuan6 ?? 0 }}
                  </td>
                  <td class="text-center font-bold">
                    {{ data?.data.desaCounts[item.id]?.countLaki9 ?? 0 }}
                  </td>
                  <td class="text-center font-bold">
                    {{ data?.data.desaCounts[item.id]?.countPerempuan9 ?? 0 }}
                  </td>
                  <td class="text-center font-bold">
                    {{
                      Object.values(
                        data?.data.desaCounts[item.id] ?? {}
                      ).reduce((a, i) => (a += i), 0)
                    }}
                  </td>
                </tr>
              </template>
              <tr>
                <td rowspan="2" colspan="2" class="text-center font-bold">
                  GRAND TOTAL
                </td>
                <td class="text-center font-bold">
                  {{ data?.data.grandTotal.countLaki6 }}
                </td>
                <td class="text-center font-bold">
                  {{ data?.data.grandTotal.countPerempuan6 }}
                </td>
                <td class="text-center font-bold">
                  {{ data?.data.grandTotal.countLaki9 }}
                </td>
                <td class="text-center font-bold">
                  {{ data?.data.grandTotal.countPerempuan9 }}
                </td>
                <td rowspan="2" class="text-center font-bold">
                  {{
                    Object.values(data?.data.grandTotal ?? {}).reduce(
                      (a, i) => (a += i),
                      0
                    )
                  }}
                </td>
              </tr>
              <tr class="highlight">
                <td colspan="2" class="text-center font-bold">
                  {{
                    (data?.data.grandTotal.countLaki6 ?? 0) +
                    (data?.data.grandTotal.countPerempuan6 ?? 0)
                  }}
                </td>
                <td colspan="2" class="text-center font-bold">
                  {{
                    (data?.data.grandTotal.countLaki9 ?? 0) +
                    (data?.data.grandTotal.countPerempuan9 ?? 0)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UCard>
  </main>
</template>

<style scoped>
  td,
  th {
    border-width: 1px;
    padding: 0.25rem;
    border-color: gray;
  }
  .highlight {
    background-color: lightblue;
  }
</style>
