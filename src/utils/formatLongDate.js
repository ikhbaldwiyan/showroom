export default function formatLongDate(dateInput) {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  
  function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
  }
  
  var dt = new Date(dateInput);
  var time = dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear() + " " + format_two_digits(dt.getHours()) + ":" + format_two_digits(dt.getMinutes());

  return time;
}
