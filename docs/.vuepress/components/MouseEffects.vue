<template><canvas ref="canvas" class="mouse-effects" aria-hidden="true"></canvas></template>

<script>
const colors = ['#ef476f', '#ff7096', '#f59e0b', '#22c55e', '#38bdf8', '#8b5cf6']

export default {
  name: 'MouseEffects',
  data: () => ({ context: null, width: 0, height: 0, ratio: 1, particles: [], hearts: [], mouse: null, frame: 0, reducedMotion: false }),
  mounted () {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.context = this.$refs.canvas.getContext('2d')
    this.resize()
    window.addEventListener('resize', this.resize, { passive: true })
    window.addEventListener('mousemove', this.onMove, { passive: true })
    window.addEventListener('mouseout', this.onLeave)
    window.addEventListener('click', this.onClick)
    document.addEventListener('visibilitychange', this.onVisibility)
    if (!this.reducedMotion) this.frame = requestAnimationFrame(this.draw)
  },
  beforeDestroy () {
    cancelAnimationFrame(this.frame)
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('mouseout', this.onLeave)
    window.removeEventListener('click', this.onClick)
    document.removeEventListener('visibilitychange', this.onVisibility)
  },
  methods: {
    resize () {
      this.width = window.innerWidth; this.height = window.innerHeight
      this.ratio = Math.min(window.devicePixelRatio || 1, 2)
      const canvas = this.$refs.canvas
      canvas.width = this.width * this.ratio; canvas.height = this.height * this.ratio
      canvas.style.width = `${this.width}px`; canvas.style.height = `${this.height}px`
      this.context.setTransform(this.ratio, 0, 0, this.ratio, 0, 0)
      const count = Math.min(60, Math.max(28, Math.floor(this.width * this.height / 24000)))
      while (this.particles.length < count) this.particles.push(this.createParticle())
      this.particles.length = count
    },
    createParticle () { return { x: Math.random() * this.width, y: Math.random() * this.height, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, size: Math.random() * 1.3 + .6 } },
    onMove (event) { this.mouse = { x: event.clientX, y: event.clientY } },
    onLeave (event) { if (!event.relatedTarget) this.mouse = null },
    onClick (event) {
      const amount = this.reducedMotion ? 1 : 5
      for (let i = 0; i < amount; i++) this.hearts.push({ x: event.clientX + (Math.random() - .5) * 22, y: event.clientY + (Math.random() - .5) * 12, vx: (Math.random() - .5) * 1.5, vy: -1.2 - Math.random() * 1.6, size: 7 + Math.random() * 7, life: 1, color: colors[Math.floor(Math.random() * colors.length)] })
      if (this.reducedMotion) { this.context.clearRect(0, 0, this.width, this.height); this.drawHeart(this.hearts[0]); setTimeout(() => this.context.clearRect(0, 0, this.width, this.height), 500) }
    },
    onVisibility () { if (document.hidden) cancelAnimationFrame(this.frame); else if (!this.reducedMotion) this.frame = requestAnimationFrame(this.draw) },
    draw () {
      const ctx = this.context
      ctx.clearRect(0, 0, this.width, this.height)
      this.updateParticles(ctx); this.updateHearts(ctx)
      this.frame = requestAnimationFrame(this.draw)
    },
    updateParticles (ctx) {
      const radius = 190
      this.particles.forEach((p, index) => {
        if (this.mouse) {
          const dx = this.mouse.x - p.x, dy = this.mouse.y - p.y, distance = Math.hypot(dx, dy)
          if (distance < radius && distance > 1) {
            const force = (1 - distance / radius) * .025
            p.vx += dx / distance * force; p.vy += dy / distance * force
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(this.mouse.x, this.mouse.y)
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - distance / radius) * .2})`; ctx.stroke()
          }
        }
        p.vx *= .988; p.vy *= .988
        const speed = Math.hypot(p.vx, p.vy)
        if (speed > 1.8) { p.vx = p.vx / speed * 1.8; p.vy = p.vy / speed * 1.8 }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > this.width) p.vx *= -1
        if (p.y < 0 || p.y > this.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = 'rgba(71, 85, 105, .35)'; ctx.fill()
        for (let j = index + 1; j < this.particles.length; j++) {
          const q = this.particles[j], distance = Math.hypot(q.x - p.x, q.y - p.y)
          if (distance < 105) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(100,116,139,${(1-distance/105)*.13})`; ctx.stroke() }
        }
      })
    },
    updateHearts (ctx) {
      this.hearts.forEach(heart => { heart.x += heart.vx; heart.y += heart.vy; heart.vy += .015; heart.life -= .018; heart.size += .025; this.drawHeart(heart, ctx) })
      this.hearts = this.hearts.filter(heart => heart.life > 0)
    },
    drawHeart (heart, suppliedContext) {
      const ctx = suppliedContext || this.context, s = heart.size
      ctx.save(); ctx.translate(heart.x, heart.y); ctx.scale(s / 16, s / 16); ctx.beginPath(); ctx.moveTo(0, 5); ctx.bezierCurveTo(-14, -4, -8, -14, 0, -7); ctx.bezierCurveTo(8, -14, 14, -4, 0, 5); ctx.fillStyle = heart.color; ctx.globalAlpha = Math.max(0, heart.life); ctx.fill(); ctx.restore()
    }
  }
}
</script>

<style scoped>
.mouse-effects{position:fixed;inset:0;z-index:9998;pointer-events:none}
</style>
