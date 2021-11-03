export default function (times) {
    function formatTime(n) {
      return n < 10 ? '0' + n : n;
    }
  
    function getTimes(dateInput) {
      var date = new Date(dateInput);
      var time = `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
      return time;
    }

    var date = new Date();

    const hours = date.getHours() + ':' + date.getMinutes();
    const streamStarted = new Date(Date.now() - 1000 * (60 * 5) ) 
    // console.log(streamStarted);
  
    return times ? getTimes(times * 1000) : 'TBD';
  }
  