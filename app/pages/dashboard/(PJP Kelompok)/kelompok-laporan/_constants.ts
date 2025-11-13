import { z } from "zod/mini";

type keteranganInput = {
  percentPaud: string;
  percentCabeRawit: string;
  percentPraremaja: string;
  percentMudamudi: string;
  countPaud: number;
  countCabeRawit: number;
  countPraremaja: number;
  countMudamudi: number;
};

export const schema = z.object({
  id: z.optional(z.number()),
  laporan: z.string().check(z.minLength(1, "Required")),
  keterangan: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (param?: keteranganInput): Schema => ({
  id: undefined,
  laporan: "Laporan tanggal " + new Date().toLocaleDateString("en-GB"),
  keterangan: templateString(param),
});

export type Schema = z.infer<typeof schema>;

export const laporanTemplate =
  "Laporan tanggal " + new Date().toLocaleDateString("en-GB");

export const templateString = (param?: keteranganInput) => `
  <h2>Tanggal Pramuslimun: 1 Oktober 2025</h2><div class="tableWrapper"><table style="min-width: 344px;"><colgroup><col style="width: 294px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="294"><p style="text-align: center;">Jenjang Kelas</p></th><th colspan="1" rowspan="1"><p style="text-align: center;">Jumlah Generus</p></th><th colspan="1" rowspan="1"><p style="text-align: center;">Absensi Generus</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="294"><p style="text-align: center;">PAUD</p></td><td colspan="1" rowspan="1"><p style="text-align: center;">${param?.countPaud}</p></td><td colspan="1" rowspan="1"><p style="text-align: center;">${param?.percentPaud}%</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="294"><p style="text-align: center;">Cabe Rawit</p></td><td colspan="1" rowspan="1"><p style="text-align: center;">${param?.countCabeRawit}</p></td><td colspan="1" rowspan="1"><p style="text-align: center;">${param?.percentCabeRawit}%</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="294"><p style="text-align: center;">Praremaja</p></td><td colspan="1" rowspan="1"><p style="text-align: center;">${param?.countPraremaja}</p></td><td colspan="1" rowspan="1"><p style="text-align: center;">${param?.percentPraremaja}%</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="294"><p style="text-align: center;">Muda-mudi</p></td><td colspan="1" rowspan="1"><p style="text-align: center;">${param?.countMudamudi}</p></td><td colspan="1" rowspan="1"><p style="text-align: center;">${param?.percentMudamudi}%</p></td></tr></tbody></table></div><h2>Koin PPG: Rp 7.000.000,00</h2><div class="tableWrapper"><table style="min-width: 540px;"><colgroup><col style="width: 51px;"><col style="width: 464px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="51"><p style="text-align: center;">No.</p></th><th colspan="1" rowspan="1" colwidth="464"><p style="text-align: center;">Permasalahan</p></th><th colspan="1" rowspan="1"><p style="text-align: center;">Solusi</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="51"><p style="text-align: center;">1</p></td><td colspan="1" rowspan="1" colwidth="464"><p style="text-align: center;"></p></td><td colspan="1" rowspan="1"><p style="text-align: center;"></p></td></tr><tr><td colspan="1" rowspan="1" colwidth="51"><p style="text-align: center;">2</p></td><td colspan="1" rowspan="1" colwidth="464"><p style="text-align: center;"></p></td><td colspan="1" rowspan="1"><p style="text-align: center;"></p></td></tr></tbody></table></div><p><br><br class="ProseMirror-trailingBreak"></p>
`;
