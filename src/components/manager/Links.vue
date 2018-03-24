<template>
  <div>
    <h3>创建友情链接<button class="btn btn-sm btn-primary mx-2" type="button" @click="createLink">创建</button></h3>
    <form>
      <div class="form-group row">
        <label for="name" class="col-md-2 col-form-label col-form-label-sm">名称</label>
        <div class="col-sm-4">
          <input type="text" class="form-control form-control-sm" id="name">
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-md-2 col-form-label col-form-label-sm">描述</label>
        <div class="col-md-4">
          <input type="text" class="form-control form-control-sm" id="description">
        </div>
      </div>
      <div class="form-group row">
        <label for="href" class="col-md-2 col-form-label col-form-label-sm">链接</label>
        <div class="col-sm-4">
          <input type="text" class="form-control form-control-sm" id="href">
        </div>
      </div>
    </form>

    <table class="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th>名称</th>
          <th>创建时间</th>
          <th>描述</th>
          <th>允许显示</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="link in links" :key="link.id">
          <td><a :href="link.href">{{link.name}}</a></td>
          <td>{{formatTime(link.create_time)}}</td>
          <td>{{link.description}}</td>
          <td>
            <span v-if="link.display">显示</span>
            <span v-else>不显示</span>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click="deleteLink(link)">删除</button>
            <button class="btn btn-sm btn-primary" @click="toggleLink(link)">
              <span v-if="link.display">隐藏</span>
              <span v-else>显示</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="mx-auto">
        <pagination baseURL="/manager/links" :has-next="links && links.length > 0" v-on:pagination="this.loadData"></pagination>
      </div>
    </div>
  </div>
  
</template>

<script>
import {formatTime} from '@/utils/time'
import Pagination from '@/components/_partial/Pagination.vue'

function loadData () {
  this.$http.get(`/api/links?page=${this.$route.query.page || 1}`).then((response) => {
    this.links = response.data.data
  })
}

function deleteLink (link) {
  const ok = confirm('确定删除这个链接吗')
  if (!ok) {
    return
  }

  this.$http.delete(`/api/links/${link.id}`).then(() => {
    this.loadData()
  })
}

function toggleLink (link) {
  this.$http.put(`/api/links/${link.id}`,
    {
      display: !link.display
    }).then(() => {
    this.loadData()
  })
}

function createLink () {
  const data = {
    name: document.querySelector('#name').value,
    description: document.querySelector('#description').value,
    href: document.querySelector('#href').value
  }
  this.$http.post('/api/links', data).then(() => {
    this.loadData()
  })
}

export default {
  name: 'links',
  data () {
    return {
      links: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData,
    formatTime,
    deleteLink,
    toggleLink,
    createLink
  },
  components: {
    Pagination
  }
}
</script>