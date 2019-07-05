<template>
  <div>
    <vue2-dropzone ref="VueDropzoneRef" id="dropzone" :options="options"></vue2-dropzone>
    <table class="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th>文件名</th>
          <th>日期</th>
          <th>大小</th>
          <th>版本</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="media in medias" :key="media.id">
          <td><a :href="`/media/${media.filename}?version=${media.version}`">{{media.filename}}</a></td>
          <td>{{formatTime(media.create_time)}}</td>
          <td>{{bytesToSize(media.size)}}</td>
          <td>{{media.version}}</td>
          <td>
            <button class="btn btn-danger btn-sm btn-raised" @click="deleteMedia(media)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="mx-auto">
        <pagination baseURL="/manager/medias" :has-next="medias && medias.length" v-on:pagination="this.loadData"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import { formatTime } from '@/utils/time'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import Pagination from '@/components/_partial/Pagination.vue'

function loadData () {
  this.$http.get(`/api/medias?page=${this.$route.query.page || 1}`).then((response) => {
    this.medias = response.data.data
  })
}

function bytesToSize (bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function deleteMedia (media) {
  this.$http.delete(`/api/medias/${media.id}`).then(() => {
    this.loadData()
  })
}

export default {
  name: 'medias',
  data () {
    return {
      medias: []
    }
  },
  created () {
    this.loadData()
  },
  components: {
    vue2Dropzone,
    Pagination
  },
  computed: {
    options: function () {
      return {
        url: '/api/medias/upload',
        thumbnailWidth: 100,
        maxFilesize: 4,
        complete: this.loadData
      }
    }
  },
  methods: {
    loadData,
    formatTime,
    bytesToSize,
    deleteMedia
  }
}
</script>

<style lang="scss" scoped>
</style>
