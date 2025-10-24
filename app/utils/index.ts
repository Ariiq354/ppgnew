export const APIBASE = "/api/v1";

export type ExtractObjectType<T> =
  NonNullable<T> extends { data: (infer U)[] } ? U : never;

export function json2Csv(data: { [key: string]: any }[]) {
  const headers = Object.keys(data[0]!).toString();

  const main = data.map((item) => {
    return Object.values(item).toString();
  });

  const csv = [headers, ...main].join("\n");

  const blob = new Blob([csv], { type: "application/csv" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.download = "data.csv";
  a.href = url;
  a.style.display = "none";

  document.body.appendChild(a);

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function getAge(isoDate: string) {
  const birthDate = new Date(isoDate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}
