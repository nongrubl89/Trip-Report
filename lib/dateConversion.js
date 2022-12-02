export default function dateConversion(date) {
  const [year, month, day] = date.split("-");

  const result = [month, day, year].join("/");

  return result;
}
