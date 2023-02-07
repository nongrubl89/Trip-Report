export default function isDateBeforeToday(date) {
  return new Date(date) < new Date(new Date().toDateString());
}
