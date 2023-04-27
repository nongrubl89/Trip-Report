function removeDashes(date) {
  return date.replace(/-/g, '');
}

function convertToFormat(date) {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  return new Date(year, month - 1, day);
}

export default function isDateBeforeToday(d1, d2) {
  const firstD = removeDashes(d1);
  const date1 = convertToFormat(firstD);
  const secondD = removeDashes(d2);
  const date2 = convertToFormat(secondD);
  if (date1 < Date.now() && date2 > Date.now()) {
    return 'In Progress';
  }
  if (date1 > Date.now() && date2 > Date.now()) {
    return 'Upcoming';
  }
  if (date1 < Date.now() && date2 < Date.now()) {
    return 'Complete';
  }
}

// if start date is before today and end date

// 4/26-28 : start date is before today and end date is after today: return "in progress"
// 4/28-4/29 : start date and end date are after today: return "upcoming"
// 4/24-4/25 : start date and end date are before today: return "completed, needs review"
