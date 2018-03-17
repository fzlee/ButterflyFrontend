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
        <h2><router-link :to="'/pages/' + article.url">{{article.title}}</router-link></h2>
        <hr>
        <p>{{article.content.slice(0, 200)}}</p>
        <div class="float-right"><router-link :to="'/pages/' + article.url">阅读全文&gt;&gt;&gt;</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import Calender from '@/components/_pages/Calendar'
import ArticleMixin from '@/mixins/ArticleMixin'

export default {
  name: 'page-preview',
  props: ['article'],
  mixins: [ArticleMixin],
  components: {
    Calender
  }
}
</script>