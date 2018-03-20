import moment from 'moment'

function formatTime (time, format) {
  return moment(time).format(format || 'YYYY-MM-DD HH:MM')
}

export {
  formatTime
}