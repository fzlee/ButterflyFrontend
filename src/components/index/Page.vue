<template>
  <div class="row">
    <div class="col-md-9">
      <div class="bigwidget">
        <article v-if="article">
          <h3><a :href="'/pages/' + article.url">{{article.title}}</a></h3>
          <div>博主创建于{{getCreateTime(article.create_at)}}</div>
          <div class="tagcloud">
            <div class="tag">
              <a href="'/search?tagname=' + encodeURIComponent(tagname)" v-for="(tagname, index) of this.splitTags(article.tags)" :key="index">{{tagname}}</a>
            </div>
          </div>
          <hr>
          <p v-if="article.editor === 'html'" v-html="article.content"></p>
          <p v-else>
            <vue-markdown>{{article.content}}</vue-markdown>
          </p>
        </article>
      </div>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment'
import ArticleMixin from '@/mixins/ArticleMixin'
import VueMarkdown from 'vue-markdown'

function loadData () {
  let url = this.$route.params.url

  this.$http.get('/api/pages/' + url).then((response) => {
    this.article = response.data.data
    this.tags = this.article.tags.split(',')
  })
}

function getCreateTime (date) {
  return moment(date).format('YYYY年MM月DD日')
}

export default {
  name: 'page',
  data () {
    return {
      'article': null,
      'tags': []
    }
  },
  mixins: [ArticleMixin],
  methods: {
    loadData,
    getCreateTime
  },
  created () {
    this.loadData()
  },
  components: {
    VueMarkdown
  }
}
</script>
