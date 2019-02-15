<template>
  <div class="col-md-9 maincolumn">
    <b-input-group prepend="二维码内容" class="mt-3">
      <b-form-input @change="drawQRCode(content)" v-model=content></b-form-input>
    </b-input-group>
    <b-form-group label="容错" class="mt-3">
      <b-form-radio-group
        v-model="errorCorrectionLevel"
        :options="correctionLevelOptions"
        @change="drawQRCode(content)">
      </b-form-radio-group>
    </b-form-group>

    <div class="row">
      <canvas id="canvas" class="mx-auto mt-3"></canvas>
    </div>
  </div>
</template>

<script>
// index.js -> bundle.js
var QRCode = require('qrcode')

function drawQRCode (content) {
  content = content || location.origin
  let canvas = document.getElementById('canvas')
  QRCode.toCanvas(canvas, content, {
    errorCorrectionLevel: this.errorCorrectionLevel,
    margin: 2,
    scale: 5
  })
}

export default {
  data () {
    return {
      content: '',
      errorCorrectionLevel: 'H',
      correctionLevelOptions: [
        { text: 'L', value: 'L' },
        { text: 'M', value: 'M' },
        { text: 'Q', value: 'Q' },
        { text: 'H', value: 'H' }
      ]
    }
  },
  mounted () {
    this.drawQRCode()
    this.$store.commit('setTitle', 'ifconfiger-二维码')
  },
  methods: {
    drawQRCode
  }
}
</script>
