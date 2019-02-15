<template>
  <div class="calendar">
    <div class="day">{{day}}</div>
    <div class="month-year">
      <div class="year">{{year}}</div>
      <div class="month">{{month}}</div>
    </div>
  </div>
</template>

<script>
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function parseDate () {
  let date = new Date(this.date)
  this.year = date.getFullYear()
  this.month = monthNames[date.getMonth()]
  this.day = date.getDate()
}

export default {
  name: 'calender',
  data () {
    return {
      'year': '',
      'month': '',
      'day': ''
    }
  },
  props: ['date', 'tags'],
  methods: {
    parseDate
  },
  mounted () {
    this.parseDate()
  }
}
</script>
