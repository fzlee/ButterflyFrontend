<template>
    <div class="maincolumn">
      <div v-if="!needInfo">

        <div class="bg">
          <div class="green"></div>
        </div>
        <div class="bigblock">
          <div class="inner">
            <h1 style="text-align:center; font-size: 56px; font-weight: bold">{{date}}</h1>
            <h1 style="text-align:center; font-size: 56px; font-weight: bold">{{time}}</h1>
            <hr/>

            <div>
              <span style="font-size: 16px; font-weight: bold">{{name}}</span>

              <div style="float:right;font-size:12px">
                <a href="#">修改</a> |
                <a href="#">代办</a>
              </div>
            </div>

            <div class="qrcode">
              <canvas id="canvas" class="mx-auto mt-3"></canvas>
            </div>
            <div class="green-desc">
              本码支持医疗机构挂号、就诊及医保结算,直接出示扫码使用
            </div>

            <div class="desc">
              绿码: 凭此码可在{{province}}范围内通行, 请主动出示,
              配合检查; 并自身防护工作,码颜色将根据您的申报由当地政府按照相关政策动态更新,
              出行前请仔细检查您的健康码
            </div>

            <div style="text-align: center">
              <a href="#" class="a">网络申诉平台</a>|
              <a href="#" class="a">常见问题</a> |
              <a href="#" class="a">我去就医</a>
            </div>
          </div>

          <button class="my-button">健康应用</button>
          <div class="footer">
            <p>依托全国一体化政务服务平台 <br> 开展跨省市(区, 市)数据共享和互通认证 </p>

            <a href="#">跨省互认健康码</a>
          </div>

          <div class="footer2 light">
            <p>服务热线: 0571-12345-6 <br>
              本服务由{{city}}人民政府提供
            </p>
            <p><span style="font-weight: bold" class="dark">中文</span> / <a href="#">English</a></p>
          </div>
        </div>

      </div>
      <div v-else>
        <div class="row mx-3 mt-3">
          <b-input-group prepend="请输入姓名" class="mt-3">
            <b-form-input v-model="name"></b-form-input>
          </b-input-group>
          <b-input-group prepend="请输入省份" class="mt-3">
            <b-form-input v-model="province"></b-form-input>
          </b-input-group>
          <b-input-group prepend="请输入城市" class="mt-3">
            <b-form-input v-model="city"></b-form-input>
          </b-input-group>

          <b-button @click="goto" class="mt-3">走你</b-button>
        </div>
      </div>

    </div>
</template>

<script>
import DateFormat from 'dateformat'
import QRCode from 'qrcode'

export default {
  data () {
    return {
      province: '',
      city: '',
      name: '',
      needInfo: true,
      content: 'https://h5.dingtalk.com/healthAct/index.html?qrCode=&stateCouncilBarCode=&cityCode=#/result',
      now: new Date()
    }
  },
  mounted () {
    this.name = this.$route.query.name || ''
    this.city = this.$route.query.city || ''
    this.province = this.$route.query.city || ''
    this.needInfo = !(this.name && this.city && this.province)
    this.timer = setInterval(() => {
      this.now = new Date()
    }, 1000)
    this.$store.commit('HIDE_NAVBAR')
  },

  destroyed () {
    clearInterval(this.timer)
    this.$store.commit('SHOW_NAVBAR')
  },
  methods: {
    goto () {
      this.$router.push({ query: { name: this.name, city: this.city } })
      this.needInfo = false
    },
    drawQRCode () {
      const now = this.date + this.time
      this.content = now + now + now + now
      const canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, this.content, {
        errorCorrectionLevel: 'H',
        margin: 2,
        scale: 5,
        width: '200',
        color: {
          dark: '#55ab6c',
          light: '#ffffff'
        }
      })
    }
  },
  computed: {
    date () {
      return DateFormat(this.now, 'm月dd日')
    },
    time () {
      return DateFormat(this.now, 'HH:MM:ss')
    }
  },
  watch: {
    needInfo (val) {
      this.$nextTick(() => {
        this.drawQRCode()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  left: 0;
  right:0;
  top: 0;
  bottom: 0;
  background-color: #ffffff;

  .green {
    min-width: 100%;
    min-height: 160px;
    background-color: #55ab6c;
  }
}

.bigblock {

  background-color: #ffffff;
  z-index:100;
  position: absolute;

  top: 1rem;
  left: 1rem;
  right: 1rem;
  border-radius: 10px;

  .inner {
    padding: 2rem 1rem 1rem 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 1px rgba(150,150,150,0.75);

  }
  .footer {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
  }

  .footer2 {
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
  }
}

.qrcode {
  #canvas {
    border-width: 5px;
    border-style: solid;
    border-color: #55ab6c;
    padding: 0;
    margin: 1rem auto;
    display: block;
  }
}

.green-desc {
  color: #55ab6c;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 10px 40px;
}

.desc {
  font-size: 12px;
  padding: 0 26px;
  text-align: center
}

.a {
  font-size: 12px
}
.light {
  color: #aaa;
}
.dark {
  color: #444;
}

.my-button{
  background-color: #448ef7;
  border: none;
  color: white;
  padding: 10px 32px;
  margin: 10px 0 0 0;
  width: 100%;
  border-radius: 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}
</style>
