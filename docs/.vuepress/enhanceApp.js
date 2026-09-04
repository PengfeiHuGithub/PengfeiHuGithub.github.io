import Live2dAssistant from './components/Live2dAssistant.vue'
import MouseEffects from './components/MouseEffects.vue'

export default ({ Vue }) => {
  if (typeof window === 'undefined') return
  Vue.mixin({
    mounted () {
      if (this !== this.$root || document.getElementById('live2d-assistant-root')) return
      const mountPoint = document.createElement('div')
      mountPoint.id = 'live2d-assistant-root'
      document.body.appendChild(mountPoint)
      new (Vue.extend(Live2dAssistant))({ parent: this }).$mount(mountPoint)
      const effectsPoint = document.createElement('div')
      effectsPoint.id = 'mouse-effects-root'
      document.body.appendChild(effectsPoint)
      new (Vue.extend(MouseEffects))({ parent: this }).$mount(effectsPoint)
    }
  })
}
