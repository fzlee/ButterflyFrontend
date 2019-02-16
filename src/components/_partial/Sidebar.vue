<template>
  <div class="col-md-3 maincolumn" >
    <div class="sidebar">
      <div class="announcement widget" v-if="announcement && announcement.content">
        <div class="title">
          <strong>公告</strong>
        </div>
        <div class="announcebody">
          <div>{{announcement.content}}...</div>
          <div class="float-right"><router-link :to="`/articles/${announcement.url}`">查看&gt;&gt;</router-link></div>
        </div>
      </div>

      <div class="tags widget" v-if="tags && tags.length">
        <div class="title">
          <strong>标签</strong>
        </div>
        <div class="tagcloud">
          <div v-for="(tag, index) in tags" :key="index" class="tag">
            <button @click="routeTo(tag)">{{tag}}</button>
          </div>
        </div>
      </div>

      <div class="comments widget" v-if="comments && comments.length">
        <div class="title">
          <strong>最近评论</strong>
        </div>
        <div v-for="(comment, index) in comments" :key="index" class="c-list">
          <div class="c-meta">
            <i class="c-nickname">{{comment.nickname}}</i> 在
            <span class="c-time">{{formatTime(comment.create_time)}}</span>
          </div>
          <div class="c-content"><router-link :to="`/articles/${comment.page.url}`">{{comment.content}}</router-link></div>
        </div>
      </div>

      <div class="links widget" v-if="links && links.length">
        <div class="title">
          <strong>友情链接</strong>
        </div>
        <ul>
          <li v-for="(link, index) in links" :key="index">
            <a :href="link.href">{{link.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/time'

function loadData () {
  this.$http.get('/api/articles/sidebar').then((response) => {
    this.tags = response.data.data.tags
    this.comments = response.data.data.comments
    this.links = response.data.data.links
    this.announcement = response.data.data.announcement
  })
}

function routeTo (tag) {
  this.$router.push({
    path: '/search',
    query: {
      tagname: tag
    }
  })
}

export default {
  name: 'sidebar',
  data () {
    return {
      tags: [],
      announcement: {},
      comments: [],
      links: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData,
    formatTime,
    routeTo
  }
}
</script>

<style lang="scss" scoped>
.announcebody {
  font-size: 0.9em
}
</style>
