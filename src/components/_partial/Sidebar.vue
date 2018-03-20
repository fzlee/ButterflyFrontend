<template>
  <div class="col-md-3 maincolumn" >
    <div class="sidebar">
      <div class="announcement widget pb-4" v-if="announcement">
        <strong>公告</strong>
        <div class="announcebody">
          <div>{{announcement.content}}...</div>
          <div class="float-right"><router-link :to="`/articles/${announcement.url}`">查看&gt;&gt;</router-link></div>
        </div>
        
      </div>

      <div class="tags widget" v-if="tags">
        <strong>标签</strong>
        <div class="tagcloud">
          <div v-for="(tag, index) in tags" :key="index" class="tag">
            <router-link :to="'/search?tagname=' + encodeURIComponent(tag)">{{tag}}</router-link> 
          </div>
        </div>
      </div>

      <div class="comments widget" v-if="comments">
        <strong>最近评论</strong>
        <div v-for="(comment, index) in comments" :key="index" class="c-list">
          <div class="c-meta">
            <i class="c-nickname">{{comment.nickname}}</i> 在
            <span class="c-time">{{formatCommentTime(comment.create_at)}}</span>
          </div>
          <div class="c-content"><router-link :to="comment.page.url">{{comment.content}}</router-link></div>
        </div>
      </div>

      <div class="links widget" v-if="links">
        <strong>友情链接</strong>
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
import moment from 'moment'

function loadData () {
  this.$http.get('/api/articles/sidebar').then((response) => {
    this.tags = response.data.data.tags
    this.comments = response.data.data.comments
    this.links = response.data.data.links
    this.announcement = response.data.data.announcement
  })
}

function formatCommentTime (time) {
  return moment(time).format("YYYY-MM-DD hh:mm")
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
    formatCommentTime
  }
}
</script>

<style lang="scss" scoped>
.announcebody {
  font-size: 0.9em
}
</style>