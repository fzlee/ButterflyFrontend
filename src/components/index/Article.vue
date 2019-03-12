<template>
    <div class="col-md-9 maincolumn" >
      <div class="bigwidget">
        <div class="mx-auto" v-if="article.need_key">
          <div class="form-inline">
            <div class="form-group mx-sm-3 mb-2">
              <input type="password"
                class="form-control"
                id="password"
                placeholder="5-8位字母数字"
                @keydown.enter.prevent="decryptArticle">
            </div>
            <button type="button" class="btn btn-info mb-2" @click="decryptArticle">提交</button>
          </div>
        </div>

        <article v-if="article">
          <h3><router-link :to="`/articles/${article.url}`">{{article.title}}</router-link></h3>
          <div v-if="article && article.create_time">博主创建于{{formatTime(article.create_time, 'yyyy年mm月dd日')}}</div>
          <div class="tagcloud">
            <div class="tag" v-for="(tagname, index) of this.splitTags(article.tags)" :key="index">
              <router-link :to="'/search?tagname=' + encodeURIComponent(tagname)">{{tagname}}</router-link>
            </div>
          </div>
          <hr>
          <div id="article-content" v-html="article.html"></div>
        </article>
        <hr>
        <div class="d-block-inline">
          操作：<a href="#" @click="showReplyModal()" v-if="article.allow_comment" class="btn btn-info" >评论</a> <span v-if="hasLogin()"><router-link :to="`/manager/editor?url=${article.url}`" class="btn btn-info btn-raised"> 编辑 </router-link></span>
        </div>
      </div>
      <div class="bigwidget" v-if="article && article.is_original">
        <p>除非注明，本博客文章均为原创，禁止出于商业目的全文转载。个人转载时，请以链接形式标明本文地址。</p>
        <p>本文地址：<router-link :to="getArticleURL()">{{ getHostName() + getArticleURL()}}</router-link></p>
      </div>

      <div class="bigwidget" v-if="comments && comments.length">
        <div class="c-list comments" v-for="comment in comments" :key="comment.id">
          <div class="c-meta">
            <i class="c-nickname">{{comment.nickname}}</i>
            <span v-if="comment.to"> 回复 {{comment.to}}</span>
            <span class="c-time"> {{formatTime(comment.create_time)}}</span>
            <a href="#" class="c-quote" @click="showReplyModal(comment)" v-if="article.allow_comment"> 回复</a>
          </div>
          <div class="c-content">
            {{comment.content}}
          </div>
        </div>
      </div>

      <reply ref="replyRef" v-on:refreshComments="loadData"></reply>
    </div>
</template>

<script>
// code block highlight
import { formatTime } from '@/utils/time'
import { hasLogin } from '@/services/auth'
import ArticleMixin from '@/mixins/ArticleMixin'
import TuiEditor from 'tui-editor/dist/tui-editor-Viewer'
import Reply from '@/components/_article/Reply'
require('highlight.js/styles/github.css')

function renderContent (content) {
  if (!this.editor) {
    this.editor = new TuiEditor({
      el: document.querySelector('#article-content'),
      viewer: true,
      initialValue: ''
    })
  }
  this.editor.setMarkdown(content)
}

function loadData () {
  let url = this.$route.params.url
  if (this.$route.query.is_preview === 'true') {
    url = `/api/articles/${url}`
  } else {
    url = `/api/articles/${url}/meta`
  }

  this.$http.get(url).then((response) => {
    this.article = response.data.data
    this.tags = this.article.tags.split(',')
    this.renderContent(this.article.content)

    this.$store.commit('setTitle', this.article.title)
  })

  this.$http.get(`/api/articles/${this.$route.params.url}/comments`).then((response) => {
    this.comments = response.data.data
  })
}

function showReplyModal (comment) {
  this.$refs.replyRef.showModal(comment)
}

function getArticleURL () {
  return location.pathname
}

function getHostName () {
  return location.origin
}

function decryptArticle () {
  const password = document.querySelector('#password').value
  this.$http.post(`/api/articles/${this.$route.params.url}/meta`, {
    password: password
  }).then((response) => {
    this.article = response.data.data
    this.renderContent(this.article.content)
  })
}

export default {
  name: 'one-article',
  data () {
    return {
      'article': {},
      'tags': [],
      'comments': '',
      'url': this.$route.params.url,
      editor: null
    }
  },
  mixins: [ArticleMixin],
  methods: {
    loadData,
    getArticleURL,
    getHostName,
    formatTime,
    renderContent,
    hasLogin,
    showReplyModal,
    decryptArticle
  },
  mounted () {
    this.loadData()
  },
  components: {
    Reply
  },
  watch: {
    '$route.params.url': function () {
      this.loadData()
    }
  }
}
</script>
