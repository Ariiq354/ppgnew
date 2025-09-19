import { getAllKonselingDaerah } from "~~/server/services/konseling/konseling.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { bimbingan_konseling: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllKonselingDaerah(user.daerahId, query);

  const newData = data.data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah!, tanggalMasukKelas!),
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(newData, metadata);
});
