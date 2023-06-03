export default function formatLongDate(dateInput, isGetTime = false) {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
  }

  var dt = new Date(dateInput);

  if (isGetTime) {
    var time = format_two_digits(dt.getHours()) + ":" + format_two_digits(dt.getMinutes());
    return time;
  } else {
    var longDate = dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear() + " " + format_two_digits(dt.getHours()) + ":" + format_two_digits(dt.getMinutes());
    return longDate;
  }
}
