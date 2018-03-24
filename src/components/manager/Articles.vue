<template>
  <div>
    <table class="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>标题</th>
          <th>日期</th>
          <th>原创</th>
          <th>状态</th>
          <th>允许评论</th>
          <th>编辑器</th>
          <th>密码</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in this.articles" :key="article.url">
          <td>{{article.id}}</td>
          <td>
            <router-link :to="`/manager/editor/?url=${article.url}`">[编辑]</router-link>
            <router-link :to="`/manager/preview?url=${article.url}`">[预览]</router-link>
            <router-link :to="`/articles/${article.url}`">{{article.title}}</router-link>
          </td>
          <td>{{formatTime(article.create_time)}}</td>
          <td>{{article.is_original? '原创': '非原创'}}</td>
          <td>{{article.display? '发布': '隐藏'}}</td>
          <td>{{article.allow_comment? '允许评论': '禁止评论'}}</td>
          <td>{{article.editor}}</td>
          <td>{{article.need_key? '密码访问': '公开访问'}}</td>
          <td><button class="btn btn-sm btn-danger" @click="deleteArticle(article)">删除</button></td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="mx-auto">
        <pagination baseURL="/manager/articles" :has-next="articles && articles.length" v-on:pagination="this.loadData"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/_partial/Pagination.vue'
import {formatTime} from '@/utils/time'

function loadData () {
  this.$http.get(`/api/articles?page=${this.$route.query.page || 1}`).then((response) => {
    this.articles = response.data.data
  })
}

function deleteArticle (article) {
  const ok = confirm(`确定删除${article.title}吗`)
  if (!ok) {
    return
  }

  this.$http.delete(`/api/articles/${article.url}`).then(() => {
    location.reload()
  })
}

export default {
  data () {
    return {
      articles: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData,
    formatTime,
    deleteArticle
  },
  components: {
    Pagination
  }
}
</script>