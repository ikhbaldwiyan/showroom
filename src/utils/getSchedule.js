export default function (times, type) {
  function getTimes(dateInput) {
    const date = new Date(dateInput);
    const language = type !== 'isLastSeen' && 'id-ID';
    const longSchedule = date.toLocaleString(language, { 
      month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const liveToday = date.toLocaleString('id-ID', {
      hour: '2-digit', minute: '2-digit'
    });

    let today = new Date();
    let isToday = (today.toDateString() == date.toDateString());

    if (isToday  && type == 'home') {
      return liveToday
    } else {
      return longSchedule
    }
  }

  return times ? getTimes(times * 1000) : 'TBD';
}
