export function convertToNameFormat(input: string) {
  const numberWords = [
    "nol",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];

  return input
    .replace(/\d/g, (digit) => numberWords[parseInt(digit)]!)
    .replace(/\s+/g, "")
    .toLowerCase();
}

export function titleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
