<template>
  <div class="widget">
    <div class="row">
      <div class="col-md-3">
        <calender :date="article.create_time"></calender>
        <div class="tagcloud">
          <div class="tag" v-for="tag in splitTags(article.tags)" :key="tag">
            <router-link :to="'/search?tagname=' + encodeURIComponent(tag)">{{tag}}</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <h2><router-link :to="`/articles/${article.url}`">{{article.title}}</router-link></h2>
        <hr>
        <p v-if="!article.need_key">{{article.preview}}...</p>
        <p v-else class="text-danger"><i>文章已被加密，请输入密码访问</i></p>
        <div class="float-right"><router-link :to="`/articles/${article.url}`">阅读全文&gt;&gt;&gt;</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import Calender from '@/components/_articles/Calendar'
import ArticleMixin from '@/mixins/ArticleMixin'

export default {
  name: 'article-preview',
  props: ['article'],
  mixins: [ArticleMixin],
  components: {
    Calender
  }
}
</script>