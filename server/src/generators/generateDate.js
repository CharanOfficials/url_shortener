const date = new Date();
date.setHours(0, 0, 0, 0);
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}
export function generateDate() {
  const date = formatDate(new Date("2023-01-05"));
  return date;
}
