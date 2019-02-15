<template>
  <div>
    <table class="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th>昵称</th>
          <th>IP</th>
          <th>日期</th>
          <th nowrap>网站</th>
          <th>内容</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments" :key="comment.id">
          <td><a :href="`mailto:${comment.email}`">{{comment.nickname}}</a></td>
          <td>{{comment.ip}}</td>
          <td nowrap>{{formatTime(comment.create_time)}}</td>
          <td>
            <span v-if="comment.website"><a :href="comment.website">@</a></span>
          </td>
          <td><router-link :to="`/articles/${comment.page.url}`">{{comment.content}}</router-link></td>
          <td><button class="btn btn-sm btn-raised btn-danger" type="button" @click="deleteComment(comment)">删除</button></td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="mx-auto">
        <pagination baseURL="/manager/comments" :has-next="comments && comments.length" v-on:pagination="this.loadData"></pagination>
      </div>
    </div>
  </div>

</template>

<script>
import { formatTime } from '@/utils/time'
import Pagination from '@/components/_partial/Pagination.vue'

function loadData () {
  this.$http.get(`/api/comments?page=${this.$route.query.page || 1}`).then((response) => {
    this.comments = response.data.data
  })
}

function deleteComment (comment) {
  const ok = confirm('确定删除这条评论吗')
  if (!ok) {
    return
  }

  this.$http.delete(`/api/comments/${comment.id}`).then(() => {
    this.loadData()
  })
}

export default {
  name: 'comments',
  components: {
    Pagination
  },
  data () {
    return {
      comments: []
    }
  },
  methods: {
    formatTime,
    loadData,
    deleteComment
  },
  created () {
    this.loadData()
  }
}
</script>
