<template>
    <div class="col-md-9 maincolumn" >
      <div class="bigwidget" v-if="article">
        <article>
          <h3><router-link :to="`/articles/${article.url}`">{{article.title}}</router-link></h3>
          <div>博主创建于{{getCreateTime(article.create_at)}}</div>
          <div class="tagcloud">
            <div class="tag">
              <router-link :to="'/search?tagname=' + encodeURIComponent(tagname)" v-for="(tagname, index) of this.splitTags(article.tags)" :key="index">{{tagname}}</router-link>
            </div>
          </div>
          <hr>
          <p v-if="article.editor === 'html'" v-html="article.content"></p>
          <p v-else>
            <vue-markdown>{{article.content}}</vue-markdown>
          </p>
        </article>
        <hr>
        操作：评论 <span v-if="true">| <router-link :to="`/manager/editor?url=${article.url}`"> 编辑 </router-link></span> 
      </div>
      <div class="bigwidget" v-if="article && article.is_original">
        <p>除非注明，本博客文章均为原创，禁止出于商业目的全文转载。个人转载时，请以链接形式标明本文地址。</p>
        <p>本文地址：<router-link :to="getArticleURL()">{{getArticleURL()}}</router-link></p>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import ArticleMixin from '@/mixins/ArticleMixin'
import VueMarkdown from 'vue-markdown'

function loadData () {
  let url = this.$route.params.url

  this.$http.get('/api/articles/' + url).then((response) => {
    this.article = response.data.data
    this.tags = this.article.tags.split(',')
  })
}

function getCreateTime (date) {
  return moment(date).format('YYYY年MM月DD日')
}

function getArticleURL() {
  return location.origin + location.pathname
}

export default {
  name: 'article',
  data () {
    return {
      'article': null,
      'tags': []
    }
  },
  mixins: [ArticleMixin],
  methods: {
    loadData,
    getCreateTime,
    getArticleURL
  },
  created () {
    this.loadData()
  },
  components: {
    VueMarkdown
  }
}
</script>
