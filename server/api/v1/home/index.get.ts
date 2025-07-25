export default defineEventHandler(async (event) => {
  authGuard(event);

  function createDatasets(maleData: number[], femaleData: number[]) {
    return [
      {
        label: "Laki-laki",
        data: maleData,
        borderWidth: 1,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Perempuan",
        data: femaleData,
        borderWidth: 1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
      },
    ];
  }

  function createGroupDataset(groupData: number[], label: string) {
    return [
      {
        label,
        data: groupData,
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF9F40", // Orange
        ],
      },
    ];
  }

  const generusDatasets = createDatasets(
    [1, 5, 8, 2, 8, 2],
    [2, 8, 5, 1, 5, 1]
  );
  const generusGroupDatasets = createGroupDataset(
    [1, 5, 8, 2, 8, 2],
    "Generus Group"
  );
  const pengajarDatasets = createDatasets([1, 5, 8], [2, 8, 5]);
  const pengajarGroupDatasets = createGroupDataset([1, 5, 8], "Pengajar Group");
  const data = {
    generusDatasets,
    generusGroupDatasets,
    pengajarDatasets,
    pengajarGroupDatasets,
  };

  return HttpResponse(data);
});
