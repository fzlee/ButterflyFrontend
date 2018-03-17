<template>
  <div class="col-md-9 maincolumn">
    <div v-for="article in articles" :key="article.url">
      <article-preview :article="article"></article-preview>  
    </div>
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
