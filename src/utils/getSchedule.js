export default function (times) {
  function formatTime(n) {
    return n < 10 ? '0' + n : n;
  }

  function getTimes(dateInput) {
    var date = new Date(dateInput);
    var time = `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
    return time;
  }

  return getTimes(times * 1000);
}
