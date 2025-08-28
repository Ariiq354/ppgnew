<script setup lang="ts">
  import { useConstantStore } from "~/stores/constant";
  import { APIBASE } from "~/utils";

  const constantStore = useConstantStore();
  constantStore.setTitle("Dashboard / Preview Kelas 6 & 9");

  const { data } = await useFetch(`${APIBASE}/home/kelas69`);

  const content = ref();
  const isLoading = ref(false);
  async function downloadPDF2() {
    if (content.value) {
      isLoading.value = true;

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-oklch"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(content.value, {
        scale: 2,
      });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("example.pdf");
      isLoading.value = false;
    }
  }
</script>

<template>
  <Title>Dashboard | Preview Kelas 6 & 9</Title>
  <main>
    <UCard class="mb-4">
      <UButton :loading="isLoading" size="xl" @click="downloadPDF2">
        Download PDF
      </UButton>
    </UCard>
    <UCard>
      <div class="flex justify-center">
        <div ref="content" class="content w-fit px-38 py-12">
          <div
            class="mx-auto mb-4 w-full max-w-[30rem] text-center text-xl font-bold"
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
                  <td colspan="2" class="font-bold">{{ item.name }}</td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
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
                    {{ 0 }}
                  </td>
                  <td class="text-center">
                    {{ 0 }}
                  </td>
                  <td class="text-center">
                    {{ 0 }}
                  </td>
                  <td class="text-center">
                    {{ 0 }}
                  </td>
                  <td class="text-center">
                    {{ 0 }}
                  </td>
                </tr>
                <tr>
                  <td />
                  <td class="text-center font-bold">Subtotal</td>
                  <td class="text-center font-bold">
                    {{ 0 }}
                  </td>
                  <td class="text-center font-bold">
                    {{ 0 }}
                  </td>
                  <td class="text-center font-bold">
                    {{ 0 }}
                  </td>
                  <td class="text-center font-bold">
                    {{ 0 }}
                  </td>
                  <td class="text-center font-bold">
                    {{ 0 }}
                  </td>
                </tr>
              </template>
              <tr>
                <td rowspan="2" />
                <td rowspan="2" class="text-center font-bold">GRAND TOTAL</td>
                <td class="text-center font-bold">
                  {{ 0 }}
                </td>
                <td class="text-center font-bold">
                  {{ 0 }}
                </td>
                <td class="text-center font-bold">
                  {{ 0 }}
                </td>
                <td class="text-center font-bold">
                  {{ 0 }}
                </td>
                <td rowspan="2" class="text-center font-bold">
                  {{ 0 }}
                </td>
              </tr>
              <tr class="highlight">
                <td colspan="2" class="text-center font-bold">
                  {{ 0 }}
                </td>
                <td colspan="2" class="text-center font-bold">
                  {{ 0 }}
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
