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
function parseDate () {
  console.log(this.date)
  let time = new Date(this.date)
  this.year = time.getYear()
  this.month = time.getMonth()
  this.day = time.getDay()
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