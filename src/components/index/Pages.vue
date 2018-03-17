<template>
  <div class="col-md-9 maincolumn">
    <div v-for="article in articles" :key="article.url">
      <article-preview :article="article"></article-preview>  
    </div>
    <div class="row">
      <div class="mx-auto">
        <pagination baseURL="" :has-next="articles && articles.length" v-on:pagination="this.loadData"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlePreview from '@/components/_pages/ArticlePreview.vue'
import Pagination from '@/components/_pages/Pagination.vue'

function loadData () {
  this.$http.get('/api/pages/preview?page=' + this.$route.query.page || 1).then((response) => {
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
  },
  components: {
    ArticlePreview,
    Pagination
  }
}
</script>
