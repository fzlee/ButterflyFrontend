<template>
  <div class="row">
    <div class="col-md-9">
      <div v-for="article in articles" :key="article.url">
        <article-preview :article="article"></article-preview>  
      </div>
    </div>
    <div class="col-md-3">asas</div>
  </div>
</template>

<script>
import ArticlePreview from '@/components/_pages/ArticlePreview.vue'

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
  },
  components: {
    ArticlePreview
  }
}
</script>
