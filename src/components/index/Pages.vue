<template>
  <div class="row">
    <div class="col-md-9">asassa</div>
    <div class="col-md-3">asas</div>
  </div>
</template>

<script>
function loadData () {
  this.$http.get('/api/pages').then((response) => {
    this.articles = response.data.data
  })
}

export default {
  name: 'pages',
  data () {
    return {
      articles: []
    }
  },
  methods: {
    loadData
  },
  created () {
    this.loadData()
  } 
}
</script>
