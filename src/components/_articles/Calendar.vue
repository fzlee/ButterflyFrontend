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
import moment from 'moment'

function parseDate () {
  let time = moment(this.date)
  this.year = time.format("YYYY")
  this.month = time.format("MMMM")
  this.day = time.format("DD")
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