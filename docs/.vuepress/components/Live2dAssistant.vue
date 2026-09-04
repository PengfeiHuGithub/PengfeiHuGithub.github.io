<template>
  <div class="l2d-assistant" v-if="ready">
    <transition name="bubble"><div v-if="visible && bubble" class="l2d-bubble">{{ bubble }}</div></transition>
    <div v-if="visible" class="l2d-tools" aria-label="看板娘工具栏">
      <button title="一键换装" @click="changeModel">👗</button>
      <button title="和我对话" @click="sayNext">💬</button>
      <button title="吉凶抽签" @click="drawFortune">🎋</button>
      <button title="隐藏看板娘" @click="hide">✕</button>
    </div>
    <button v-else class="l2d-restore" title="唤醒看板娘" @click="show">召唤看板娘</button>
  </div>
</template>

<script>
const models = [
  { name: '响', path: '/live2d/hibiki/assets/hibiki.model.json' },
  { name: '千岁', path: '/live2d-extra/chitose/assets/chitose.model.json' },
  { name: '艾普西隆', path: '/live2d-extra/epsilon2_1/assets/Epsilon2.1.model.json' },
  { name: '汪子', path: '/live2d-extra/wanko/assets/wanko.model.json' },
  { name: '初音', path: '/live2d-extra/miku/assets/miku.model.json' },
  { name: '雫', path: '/live2d-extra/shizuku/assets/shizuku.model.json' },
  { name: '托罗', path: '/live2d-extra/tororo/assets/tororo.model.json' },
  { name: 'Z16', path: '/live2d-extra/z16/assets/z16.model.json' }
]
const values = ['富强、民主、文明、和谐', '自由、平等、公正、法治', '爱国、敬业、诚信、友善']
const greetings = ['欢迎来到胡鹏飞的博客，今天也要保持好奇心呀！', '累了就休息一下，学习是一场马拉松。', '遇到问题不要慌，把它拆小就容易了。', ...values]
const fortunes = [['大吉','灵感与好运都在路上，适合解决最棘手的问题。'],['中吉','稳扎稳打会有不错的收获，记得及时提交代码。'],['小吉','今天适合查漏补缺，一个小进步也值得庆祝。'],['吉','保持专注，答案会在下一次尝试中浮现。'],['末吉','别急着否定自己，休息片刻再重新出发。']]

export default {
  name: 'Live2dAssistant',
  data: () => ({ ready: false, visible: true, bubble: '', modelIndex: 0, messageIndex: 0, idleTimer: null, bubbleTimer: null, lastHover: '', hiddenAt: 0 }),
  mounted () {
    this.ready = true
    this.visible = localStorage.getItem('live2d-visible') !== 'false'
    this.modelIndex = Number(localStorage.getItem('live2d-model') || 0) % models.length
    this.$nextTick(() => {
      setTimeout(() => {
        if (!this.visible) this.setWidgetVisible(false)
        else if (this.modelIndex) this.loadModel(models[this.modelIndex])
      }, 600)
      this.say(this.routeGreeting())
      this.resetIdleTimer()
      window.addEventListener('mousemove', this.resetIdleTimer, { passive: true })
      window.addEventListener('keydown', this.resetIdleTimer)
      window.addEventListener('scroll', this.resetIdleTimer, { passive: true })
      document.addEventListener('mouseover', this.handleHover)
      document.addEventListener('copy', this.handleCopy)
      document.addEventListener('visibilitychange', this.handleVisibility)
      window.addEventListener('keydown', this.handleScreenshot)
    })
  },
  beforeDestroy () {
    clearTimeout(this.idleTimer); clearTimeout(this.bubbleTimer)
    window.removeEventListener('mousemove', this.resetIdleTimer)
    window.removeEventListener('keydown', this.resetIdleTimer)
    window.removeEventListener('scroll', this.resetIdleTimer)
    document.removeEventListener('mouseover', this.handleHover)
    document.removeEventListener('copy', this.handleCopy)
    document.removeEventListener('visibilitychange', this.handleVisibility)
    window.removeEventListener('keydown', this.handleScreenshot)
  },
  methods: {
    routeGreeting () {
      const holiday = this.holidayGreeting()
      if (holiday) return holiday
      const hour = new Date().getHours()
      if (hour < 6) return '夜深了，注意休息，明天再继续努力吧。'
      if (hour < 11) return '早上好！愿你今天元气满满。'
      if (hour < 14) return '中午好，记得按时吃饭。'
      if (hour < 19) return '下午好，一起学点新知识吧！'
      return '晚上好，欢迎回来。'
    },
    holidayGreeting () {
      const now = new Date(), key = `${now.getMonth() + 1}-${now.getDate()}`
      const solar = { '1-1': '新年快乐！愿新的一年代码无 Bug。', '5-1': '劳动节快乐，认真生活也要好好休息。', '10-1': '国庆节快乐！祝祖国繁荣昌盛。', '12-25': '圣诞快乐，愿惊喜如期而至。' }
      if (solar[key]) return solar[key]
      try {
        const lunar = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'long', day: 'numeric' }).format(now)
        if (lunar.includes('正月初一')) return '新春快乐！祝你万事顺意、步步高升。'
        if (lunar.includes('正月十五')) return '元宵节快乐，愿人月两团圆。'
        if (lunar.includes('五月初五')) return '端午安康，别忘了吃粽子。'
        if (lunar.includes('八月十五')) return '中秋快乐，愿好事花好月圆。'
      } catch (e) {}
      return ''
    },
    say (text) {
      this.bubble = text; clearTimeout(this.bubbleTimer)
      this.bubbleTimer = setTimeout(() => { this.bubble = '' }, 7000)
    },
    sayNext () { this.say(greetings[this.messageIndex++ % greetings.length]); this.resetIdleTimer() },
    drawFortune () { const item = fortunes[Math.floor(Math.random() * fortunes.length)]; this.say(`今日签运：${item[0]}。${item[1]}`); this.resetIdleTimer() },
    handleHover (event) {
      const target = event.target.closest && event.target.closest('input[type="search"], .search-box input, h1, h2, a[href*="github"], a[href*="gitee"], .copy-code-button')
      if (!target) return
      const key = target.tagName + target.className
      if (key === this.lastHover) return
      this.lastHover = key
      if (target.matches('input[type="search"], .search-box input')) this.say('想搜索什么文章呢？输入关键词试试看吧。')
      else if (target.matches('.copy-code-button')) this.say('点击即可复制代码，使用时记得注明出处哦！')
      else if (target.matches('a[href*="github"], a[href*="gitee"]')) this.say('要去看看项目源码吗？说不定会有新发现。')
      else this.say('这部分看起来很重要，要认真读一读哦。')
    },
    handleCopy () { this.say('复制成功，使用或转载时记得注明出处哦！') },
    handleVisibility () { if (document.hidden) this.hiddenAt = Date.now(); else if (this.hiddenAt) { this.say('你终于回来啦！我们继续吧。'); this.hiddenAt = 0 } },
    handleScreenshot (event) { if (event.key === 'PrintScreen' || (event.ctrlKey && event.shiftKey && ['S', 's'].includes(event.key))) this.say('截图完成了吗？欢迎分享，也请记得注明来源哦！') },
    resetIdleTimer () {
      clearTimeout(this.idleTimer)
      this.idleTimer = setTimeout(() => { if (this.visible) { this.say(values[Math.floor(Math.random() * values.length)]); this.resetIdleTimer() } }, 22000)
    },
    setWidgetVisible (show) { const el = document.getElementById('live2d-widget'); if (el) el.style.display = show ? '' : 'none' },
    hide () { this.visible = false; this.setWidgetVisible(false); localStorage.setItem('live2d-visible', 'false') },
    show () { this.visible = true; this.setWidgetVisible(true); localStorage.setItem('live2d-visible', 'true'); this.$nextTick(() => this.say('我回来啦！')) },
    changeModel () { this.modelIndex = (this.modelIndex + 1) % models.length; localStorage.setItem('live2d-model', this.modelIndex); this.loadModel(models[this.modelIndex]); this.say(`已换装：${models[this.modelIndex].name}`) },
    loadModel (model, retry = 0) {
      const oldCanvas = document.getElementById('live2d_canvas')
      if (!oldCanvas || typeof window.loadlive2d !== 'function') {
        if (retry < 8) setTimeout(() => this.loadModel(model, retry + 1), 250)
        return
      }
      const canvas = oldCanvas.cloneNode(false)
      oldCanvas.parentNode.replaceChild(canvas, oldCanvas)
      window.requestAnimationFrame(() => window.loadlive2d('live2d_canvas', this.$withBase(model.path)))
    }
  }
}
</script>

<style scoped>
.l2d-bubble{position:fixed;right:22px;bottom:310px;z-index:100001;max-width:250px;padding:12px 16px;border:1px solid #7dd3fc;border-radius:14px;background:#fffffff2;color:#334155;box-shadow:0 8px 26px #0f172a24;font-size:14px;line-height:1.6}.l2d-bubble:after{content:"";position:absolute;right:55px;bottom:-9px;width:16px;height:16px;transform:rotate(45deg);border-right:1px solid #7dd3fc;border-bottom:1px solid #7dd3fc;background:#fff}.l2d-tools{position:fixed;right:18px;bottom:16px;z-index:100001;display:flex;gap:6px;padding:5px;border:1px solid #dbeafe;border-radius:20px;background:#fffffff0;box-shadow:0 6px 18px #0f172a1f}.l2d-tools button{width:34px;height:34px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer}.l2d-tools button:hover{background:#e0f2fe;transform:translateY(-2px)}.l2d-restore{position:fixed;right:16px;bottom:16px;z-index:100001;padding:8px 13px;border:0;border-radius:18px;background:#0ea5e9;color:#fff;box-shadow:0 6px 18px #0ea5e94d;cursor:pointer}.bubble-enter-active,.bubble-leave-active{transition:.25s}.bubble-enter,.bubble-leave-to{transform:translateY(8px);opacity:0}@media(max-width:719px){.l2d-assistant{display:none}}
.l2d-bubble{right:22px!important;bottom:448px!important}.l2d-tools{right:250px!important;bottom:18px!important}
</style>
