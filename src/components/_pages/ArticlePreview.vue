<template>
  <div class="widget">
    <div class="row">
      <div class="col-md-3">
        <calender :date="article.create_time"></calender>
      </div>
      <div class="col-md-9">
        <h2><a :href="'/pages/' + article.url">{{article.title}}</a></h2>
        <hr>
        <p>{{article.content.slice(0, 200)}}</p>
        <div class="float-right"><a href="'/pages/' + article.url">阅读全文&gt;&gt;&gt;</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import Calender from '@/components/_pages/Calendar'

export default {
  name: 'page-preview',
  props: ['article'],
  components: {
    Calender
  }
}
</script>