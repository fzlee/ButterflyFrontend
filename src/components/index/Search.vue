<template>
  <div class="col-md-9 maincolumn">
    <div class="row my-3">
      <form class="form mx-auto">
        <div class="form-group mx-sm-3 mb-2">
          <input type="text" class="form-control" id="" placeholder="标签搜索" v-model="tagname" @keydown.enter.prevent="doSearch">
        </div>
      </form>
    </div>

    <div v-for="article in articles" :key="article.url">
      <article-preview :article="article"></article-preview>
    </div>

    <div class="row">
      <div class="mx-auto">
        <pagination baseURL="" :has-next="articles && articles.length > 0" v-on:pagination="doSearch"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlePreview from '@/components/_articles/ArticlePreview.vue'
import Pagination from '@/components/_partial/Pagination.vue'

function doSearch () {
  if (this.tagname.length === 0) {
    return
  }
  this.articles = []

  const url = `/api/articles/search?tagname=${encodeURIComponent(this.tagname)}&page=${this.$route.query.page || 1}`
  this.$http.get(url).then((response) => {
    this.articles = response.data.data
  })
}

export default {
  name: 'default',
  data () {
    return {
      tagname: '',
      articles: []
    }
  },
  created () {
    this.tagname = this.$route.query.tagname || ''
    this.doSearch()
  },
  methods: {
    doSearch
  },
  components: {
    ArticlePreview,
    Pagination
  },
  watch: {
    '$route.query.tagname': function () {
      this.tagname = decodeURIComponent(this.$route.query.tagname)
      this.doSearch()
    }
  }
}
</script>
