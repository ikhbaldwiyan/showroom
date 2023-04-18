export default function formatLongDate(dateInput, isTime = false) {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  
  function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
  }
  let time = '';
  
  var dt = new Date(dateInput);
  if (isTime) {
    time = format_two_digits(dt.getHours()) + ":" + format_two_digits(dt.getMinutes());
  } else {
    time = dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear() + " " + format_two_digits(dt.getHours()) + ":" + format_two_digits(dt.getMinutes());
  }

  return time;
}
