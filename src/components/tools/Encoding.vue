<template>
  <div class="col-md-9 maincolumn">
    <div class="form-group">
      <label>输入</label>
      <textarea class="form-control" rows="3" v-model="content"></textarea>
    </div>

    <div class="form-group">
      <label>encodeURIComponent</label>
      <textarea class="form-control" rows="3" readonly :value="encodedContent"></textarea>
    </div>

    <div class="form-group">
      <label>decodeURIComponent</label>
      <textarea class="form-control" rows="3" readonly :value="decodedContent"></textarea>
    </div>
    
    <div class="form-group">
      <label>Base64编码</label>
      <textarea class="form-control" rows="3" readonly :value="base64Encoded"></textarea>
    </div>

    <div class="form-group">
      <label>Base64解码</label>
      <textarea class="form-control" rows="3" readonly :value="base64Decoded"></textarea>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  computed: {
    encodedContent: function () {
      try {
        return encodeURIComponent(this.content)  
      } catch {
        return ''
      }
    },
    decodedContent: function () {
      try {
        return decodeURIComponent(this.content)
      } catch {
        return ''
      }
    },
    base64Encoded: function () {
      try {
        return btoa(this.content)
      } catch {
        return ''
      }
    },
    base64Decoded: function () {
      try {
        return atob(this.content)
      } catch {
        return ''
      }
    }
  }
}
</script>