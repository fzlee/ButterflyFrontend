<template>
  <div class="col-md-9 maincolumn">
    <div v-for="article in articles" :key="article.url">
      <article-preview :article="article"></article-preview>  
    </div>
    <pagination baseURL="" :has-next="articles && articles.length" v-on:pagination="this.loadData" v-if="articles.length !== 0"></pagination>
  </div>
</template>

<script>
import ArticlePreview from '@/components/_articles/ArticlePreview.vue'
import Pagination from '@/components/_partial/Pagination.vue'

function loadData () {
  this.$http.get(`/api/articles/preview?page=${this.$route.query.page || 1}`).then((response) => {
    this.articles = response.data.data
  })
  this.$store.commit('setTitle', `ifconfiger-第${this.$route.query.page || 1}页`)
}

export default {
  name: 'articles',
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
