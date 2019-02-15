import DateFormat from 'dateformat'

function formatTime (time, format) {
  const date = new Date(time)
  return DateFormat(date, format || 'yyyy-mm-dd HH:MM')
}

export {
  formatTime
}
