<template>
  <div class="hero-container">
    <!-- ═══════ 第一屏：深色英雄区 ═══════ -->
    <section class="hero-section">
      <!-- 视频背景 -->
      <video class="hero-video" :src="videoSrc" autoplay muted loop playsinline></video>
      <!-- 3D 线框多面体 -->
      <div class="geo-shapes" ref="geoRef">
        <svg class="geo-dodeca geo-dodeca-1" viewBox="-60 -60 120 120" xmlns="http://www.w3.org/2000/svg">
          <g stroke="rgba(255,255,255,0.12)" stroke-width="0.4" fill="none">
            <line v-for="(edge, i) in dodecaEdges" :key="i"
              :x1="dodecaVerts[edge[0]][0]" :y1="dodecaVerts[edge[0]][1]"
              :x2="dodecaVerts[edge[1]][0]" :y2="dodecaVerts[edge[1]][1]" />
          </g>
          <g fill="rgba(255,255,255,0.06)">
            <circle v-for="(v, i) in dodecaVerts" :key="'v'+i" :cx="v[0]" :cy="v[1]" r="0.6" />
          </g>
        </svg>
        <svg class="geo-dodeca geo-dodeca-2" viewBox="-60 -60 120 120" xmlns="http://www.w3.org/2000/svg">
          <g stroke="rgba(255,255,255,0.09)" stroke-width="0.35" fill="none">
            <line v-for="(edge, i) in dodecaEdges2" :key="i"
              :x1="dodecaVerts2[edge[0]][0]" :y1="dodecaVerts2[edge[0]][1]"
              :x2="dodecaVerts2[edge[1]][0]" :y2="dodecaVerts2[edge[1]][1]" />
          </g>
        </svg>
        <svg class="geo-dodeca geo-dodeca-3" viewBox="-60 -60 120 120" xmlns="http://www.w3.org/2000/svg">
          <g stroke="rgba(255,255,255,0.07)" stroke-width="0.3" fill="none">
            <line v-for="(edge, i) in dodecaEdges3" :key="i"
              :x1="dodecaVerts3[edge[0]][0]" :y1="dodecaVerts3[edge[0]][1]"
              :x2="dodecaVerts3[edge[1]][0]" :y2="dodecaVerts3[edge[1]][1]" />
          </g>
        </svg>
      </div>

      <!-- 主内容 -->
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line title-bold">{{ heroTitleLine1 }}</span>
          <span class="title-line title-light">{{ heroTitleLine2 }}</span>
        </h1>
        <p class="hero-subtitle">{{ heroSubtitle }}</p>
        <div class="hero-actions">
          <a class="hero-btn-primary" :href="primaryBtnLink">
            <span>{{ primaryBtnText }}</span>
            <span class="btn-icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
          <a class="hero-btn-secondary" :href="secondaryBtnLink">
            <span>{{ secondaryBtnText }}</span>
            <span class="btn-arrow-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
        </div>
      </div>

      <!-- 左侧 HOME 文字 -->
      <div class="side-label side-label-left">HOME</div>

      <!-- 右侧 SCROLL DOWN 圆形指示器 -->
      <div class="scroll-indicator" ref="scrollIndicatorRef" @click="scrollToNext">
        <svg class="scroll-circle" viewBox="0 0 120 120">
          <defs>
            <path id="scrollTextPath" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/>
          </defs>
          <text class="scroll-text">
            <textPath href="#scrollTextPath">· SCROLL DOWN · SCROLL DOWN · SCROLL DOWN</textPath>
          </text>
        </svg>
        <div class="scroll-arrow-down">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </div>
    </section>

    <!-- ═══════ 第二屏：浅色介绍区 ═══════ -->
    <section class="intro-section" ref="introRef">
      <!-- 背景几何轮廓 -->
      <div class="intro-geo-bg">
        <svg class="intro-geo" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="1"/>
          <circle cx="150" cy="150" r="80" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="0.8"/>
          <circle cx="150" cy="150" r="40" fill="none" stroke="rgba(0,0,0,0.02)" stroke-width="0.6"/>
          <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(0,0,0,0.03)" stroke-width="0.5"/>
          <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(0,0,0,0.03)" stroke-width="0.5"/>
        </svg>
      </div>

      <div class="intro-content">
        <!-- 左侧标题区 -->
        <div class="intro-left" ref="introLeftRef">
          <h2 class="intro-heading">
            <span class="intro-heading-bold">Pioneering the</span>
            <span class="intro-heading-light">Future <em>of</em></span>
            <span class="intro-heading-bold">Artificial</span>
            <span class="intro-heading-bold">Intelligence</span>
          </h2>
          <p class="intro-tagline"><strong>Building</strong> Next-Generation<br/>AI Systems</p>
        </div>

        <!-- 右侧卡片区 -->
        <div class="intro-right" ref="introRightRef">
          <div class="feature-cards">
            <div class="feature-card" v-for="(card, i) in featureCards" :key="i" :style="{ animationDelay: `${i * 0.15}s` }">
              <h3 class="feature-card-title">{{ card.title }}</h3>
              <p class="feature-card-desc">{{ card.desc }}</p>
            </div>
          </div>
          <div class="about-card" ref="aboutCardRef">
            <div class="about-dots">
              <span class="dot dot-orange"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-light"></span>
            </div>
            <h3 class="about-title">关于博客</h3>
            <p class="about-highlight">{{ aboutHighlight }}</p>
            <p class="about-desc">{{ aboutDesc }}</p>
            <div class="about-tags">
              <span class="about-tag" v-for="tag in aboutTags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧 BACK TO TOP -->
      <div class="side-label side-label-right" @click="scrollToTop">
        <span class="back-to-top-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </span>
        <span>BACK TO TOP</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { withBase } from '@vuepress/client'

const videoSrc = withBase('/videos/kuroha-lineart.mp4')

// ─── 3D 正十二面体顶点（正交投影到 2D）───
// 使用黄金比例 φ 构建正十二面体的 20 个顶点
const PHI = (1 + Math.sqrt(5)) / 2
const phi = 1 / PHI

// 正十二面体的 20 个顶点（3 个互相垂直的黄金矩形）
const rawVerts: [number, number, number][] = [
  // 黄金矩形 1 (xy 平面)
  [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
  [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
  // 黄金矩形 2 (xz 平面)
  [0, PHI, phi], [0, PHI, -phi], [0, -PHI, phi], [0, -PHI, -phi],
  // 黄金矩形 3 (yz 平面)
  [phi, 0, PHI], [phi, 0, -PHI], [-phi, 0, PHI], [-phi, 0, -PHI],
  // 额外顶点补全
  [PHI, phi, 0], [PHI, -phi, 0], [-PHI, phi, 0], [-PHI, -phi, 0],
]

// 简化的 3D→2D 投影（正交投影，绕 Y 轴旋转 angle 弧度）
function project(verts: [number, number, number][], angleY: number, angleX: number): [number, number][] {
  const cosY = Math.cos(angleY), sinY = Math.sin(angleY)
  const cosX = Math.cos(angleX), sinX = Math.sin(angleX)
  return verts.map(([x, y, z]) => {
    // 绕 Y 轴旋转
    const x1 = x * cosY - z * sinY
    const z1 = x * sinY + z * cosY
    // 绕 X 轴旋转
    const y1 = y * cosX - z1 * sinX
    const z2 = y * sinX + z1 * cosX
    // 正交投影（忽略 z2）
    return [x1 * 22, y1 * 22] as [number, number]
  })
}

// 正十二面体的 30 条边
const dodecaEdgeIndices: [number, number][] = [
  [0,1],[0,2],[0,4],[0,8],[0,12],[0,16],
  [1,3],[1,5],[1,9],[1,17],
  [2,3],[2,6],[2,10],[2,18],
  [3,7],[3,11],[3,19],
  [4,5],[4,6],[4,8],[4,14],
  [5,7],[5,9],[5,15],
  [6,7],[6,10],[6,14],
  [7,11],[7,15],
  [8,9],[8,12],[8,14],
  [9,13],[9,15],
  [10,11],[10,12],[10,18],
  [11,13],[11,19],
  [12,13],[12,16],
  [13,17],
  [14,15],[14,18],
  [15,19],
  [16,17],[16,18],
  [17,19],
  [18,19],
]

// 三个不同旋转角度的投影
const dodecaVerts = computed(() => project(rawVerts, 0.3, 0.2))
const dodecaEdges = computed(() => dodecaEdgeIndices)

const dodecaVerts2 = computed(() => project(rawVerts, 1.2, 0.5))
const dodecaEdges2 = computed(() => dodecaEdgeIndices)

const dodecaVerts3 = computed(() => project(rawVerts, 2.5, 0.8))
const dodecaEdges3 = computed(() => dodecaEdgeIndices)

// ─── 配置 ───
const heroTitleLine1 = '沉潜'
const heroTitleLine2 = 'Deep Dive into AI'
const heroSubtitle = '沉心潜研，探索人工智能前沿，记录学术思考与工程实践'
const primaryBtnText = '开始探索'
const primaryBtnLink = '#articles'
const secondaryBtnText = '了解更多'
const secondaryBtnLink = '#about'

const featureCards = [
  { title: '深度学习', desc: '从理论到实践的完整探索' },
  { title: '工程实践', desc: '生产环境中的最佳实践' }
]

const aboutHighlight = '一个专注于人工智能与软件工程的技术博客'
const aboutDesc = '沉心潜研，在这里记录论文精读、技术探索和项目实践，分享从理论到落地的完整思考过程。'
const aboutTags = ['论文笔记', '深度学习', '工程实践', '开源项目']

// ─── 引用 ───
const introRef = ref<HTMLElement>()
const geoRef = ref<HTMLElement>()
const introLeftRef = ref<HTMLElement>()
const introRightRef = ref<HTMLElement>()
const aboutCardRef = ref<HTMLElement>()
const scrollIndicatorRef = ref<HTMLElement>()

let scrollHandler: (() => void) | null = null

onMounted(() => {
  const intro = introRef.value
  const geoShapes = geoRef.value
  const introLeft = introLeftRef.value
  const introRight = introRightRef.value
  const aboutCard = aboutCardRef.value
  const scrollIndicator = scrollIndicatorRef.value

  if (!intro) return

  scrollHandler = () => {
    const scrollY = window.scrollY

    // 滚动驱动圆形指示器旋转
    if (scrollIndicator) {
      const rotateDeg = scrollY * 0.5
      scrollIndicator.style.transform = `rotate(${rotateDeg}deg)`
      const arrow = scrollIndicator.querySelector('.scroll-arrow-down') as HTMLElement
      if (arrow) {
        arrow.style.transform = `translate(-50%, -50%) rotate(${-rotateDeg}deg)`
      }
    }

    // 几何形状视差：不同层以不同速度移动，制造深度感
    if (geoShapes) {
      const shapes = geoShapes.querySelectorAll('.geo-dodeca')
      shapes.forEach((shape, i) => {
        // 视差：越大的形状移动越慢（更远的层）
        const parallaxSpeed = 0.15 - i * 0.05
        const translateY = scrollY * parallaxSpeed
        // 微旋转
        const rotate = scrollY * (0.02 + i * 0.01)
        ;(shape as HTMLElement).style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`
      })
    }

    // 介绍区元素入场动画
    const introRect = intro.getBoundingClientRect()
    if (introRect.top < window.innerHeight * 0.8) {
      if (introLeft) introLeft.classList.add('animate-in')
      if (introRight) introRight.classList.add('animate-in')
      if (aboutCard) aboutCard.classList.add('animate-in')
    }
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})

const scrollToNext = () => {
  const intro = introRef.value
  if (intro) {
    intro.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* ═══════════════════════════════════════════
   全局容器
   ═══════════════════════════════════════════ */
.hero-container {
  width: 100%;
  overflow: hidden;
}

/* ═══════════════════════════════════════════
   第一屏：英雄区
   ═══════════════════════════════════════════ */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.6;
}

/* ─── 3D 线框多面体 ─── */
.geo-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.geo-dodeca {
  position: absolute;
  will-change: transform;
}

/* 最大的多面体：右上角，部分超出屏幕，参考 causallm.org */
.geo-dodeca-1 {
  width: 55vw;
  height: 55vw;
  max-width: 800px;
  max-height: 800px;
  top: -12%;
  right: -8%;
  opacity: 0.85;
}

/* 中等多面体：右侧中部偏上 */
.geo-dodeca-2 {
  width: 35vw;
  height: 35vw;
  max-width: 500px;
  max-height: 500px;
  top: 20%;
  right: 18%;
  opacity: 0.45;
}

/* 小多面体：底部中央偏右 */
.geo-dodeca-3 {
  width: 22vw;
  height: 22vw;
  max-width: 320px;
  max-height: 320px;
  bottom: 8%;
  right: 30%;
  opacity: 0.3;
}

/* ─── 主内容 ─── */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: left;
  padding: 0 8%;
  max-width: 900px;
  width: 100%;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0 0 28px 0;
}

.title-line {
  display: block;
  font-family: var(--font-serif, 'Playfair Display', 'Noto Serif SC', Georgia, serif);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.title-bold {
  font-size: clamp(3.2rem, 7.5vw, 6rem);
  font-weight: 900;
  color: #ffffff;
}

.title-light {
  font-size: clamp(3.2rem, 7.5vw, 6rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
}

.hero-subtitle {
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.01em;
  margin: 0 0 44px 0;
  max-width: 480px;
  line-height: 1.6;
}

/* ─── 按钮 ─── */
.hero-actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 16px 36px;
  background: #1a5c3a;
  color: #fff;
  border-radius: 100px;
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.hero-btn-primary:hover {
  background: #2ecc71;
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(26, 92, 58, 0.35);
}

.btn-icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-icon-circle svg {
  width: 16px;
  height: 16px;
}

.hero-btn-primary:hover .btn-icon-circle {
  background: rgba(0, 0, 0, 0.25);
  transform: translateX(3px);
}

.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  border: none;
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-btn-secondary:hover {
  color: #fff;
}

.btn-arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.btn-arrow-icon svg {
  width: 14px;
  height: 14px;
}

.hero-btn-secondary:hover .btn-arrow-icon {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(3px);
}

/* ─── 左侧 HOME 标签 ─── */
.side-label {
  position: absolute;
  font-family: 'Source Sans 3', monospace;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  cursor: pointer;
  z-index: 20;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.side-label-left {
  left: 28px;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  color: rgba(255, 255, 255, 0.3);
}

.side-label-left:hover {
  color: rgba(255, 255, 255, 0.6);
}

.side-label-right {
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.25);
}

.side-label-right:hover {
  color: rgba(0, 0, 0, 0.5);
}

.back-to-top-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 50%;
  margin-bottom: 8px;
}

.back-to-top-arrow svg {
  width: 14px;
  height: 14px;
}

/* ─── SCROLL DOWN 圆形指示器 ─── */
.scroll-indicator {
  position: absolute;
  bottom: 48px;
  right: 64px;
  width: 110px;
  height: 110px;
  cursor: pointer;
  z-index: 20;
}

.scroll-circle {
  width: 100%;
  height: 100%;
}

.scroll-text {
  font-family: 'Source Sans 3', monospace;
  font-size: 5.2px;
  font-weight: 700;
  letter-spacing: 0.18em;
  fill: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
}

.scroll-arrow-down {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
  background: #1a5c3a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.scroll-arrow-down svg {
  width: 16px;
  height: 16px;
  animation: bounce-down 2s ease-in-out infinite;
}

@keyframes bounce-down {
  0%, 100% { transform: translateY(-1px); }
  50% { transform: translateY(3px); }
}

/* ═══════════════════════════════════════════
   第二屏：介绍区
   ═══════════════════════════════════════════ */
.intro-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: center;
  padding: 80px 0;
  overflow: hidden;
}

.intro-geo-bg {
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translateY(-50%);
  width: 500px;
  height: 500px;
  pointer-events: none;
  opacity: 0.5;
}

.intro-geo {
  width: 100%;
  height: 100%;
}

.intro-content {
  position: relative;
  z-index: 10;
  display: flex;
  gap: 60px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 60px;
  align-items: flex-start;
}

/* ─── 左侧标题 ─── */
.intro-left {
  flex: 1;
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.intro-left.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.intro-heading {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0 0 32px 0;
}

.intro-heading-bold {
  font-family: var(--font-serif, 'Playfair Display', 'Noto Serif SC', Georgia, serif);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #111;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.intro-heading-light {
  font-family: var(--font-serif, 'Playfair Display', 'Noto Serif SC', Georgia, serif);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #999;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.intro-heading-light em {
  font-style: italic;
  font-weight: 300;
}

.intro-tagline {
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.intro-tagline strong {
  color: #111;
  font-weight: 700;
}

/* ─── 右侧卡片 ─── */
.intro-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  opacity: 0;
  transform: translateX(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.intro-right.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.feature-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.feature-card {
  background: #fff;
  border-radius: var(--radius-lg, 16px);
  padding: 28px 24px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.feature-card-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a5c3a;
  margin: 0 0 8px 0;
}

.feature-card-desc {
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 0.85rem;
  color: #888;
  margin: 0;
  line-height: 1.5;
}

/* ─── 关于卡片 ─── */
.about-card {
  background: #fff;
  border-radius: var(--radius-xl, 20px);
  padding: 32px 28px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
}

.about-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.about-dots {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-orange { background: #1a5c3a; }
.dot-yellow { background: #2ecc71; }
.dot-light { background: #e0d5c0; }

.about-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 12px 0;
}

.about-highlight {
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 0.95rem;
  color: #1a5c3a;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.about-desc {
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 0.85rem;
  color: #888;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.about-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.about-tag {
  display: inline-block;
  padding: 6px 16px;
  background: #f5f5f5;
  border-radius: 100px;
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 0.78rem;
  color: #555;
  font-weight: 500;
  transition: all 0.2s ease;
}

.about-tag:hover {
  background: #1a5c3a;
  color: #fff;
}

/* ═══════════════════════════════════════════
   移动端适配
   ═══════════════════════════════════════════ */
@media (max-width: 768px) {
  .hero-content {
    padding: 0 24px;
  }

  .title-bold,
  .title-light {
    font-size: 2.4rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .scroll-indicator {
    width: 80px;
    height: 80px;
    bottom: 24px;
    right: 24px;
  }

  .scroll-text {
    font-size: 4px;
  }

  .scroll-arrow-down {
    width: 26px;
    height: 26px;
  }

  .scroll-arrow-down svg {
    width: 12px;
    height: 12px;
  }

  .geo-dodeca-1 {
    width: 70vw;
    height: 70vw;
    top: -15%;
    right: -20%;
  }

  .geo-dodeca-2 {
    width: 45vw;
    height: 45vw;
    right: 5%;
  }

  .geo-dodeca-3 {
    width: 30vw;
    height: 30vw;
    right: 15%;
  }

  .side-label {
    display: none;
  }

  .intro-content {
    flex-direction: column;
    padding: 0 24px;
    gap: 40px;
  }

  .intro-heading-bold,
  .intro-heading-light {
    font-size: 2rem;
  }

  .feature-cards {
    grid-template-columns: 1fr;
  }

  .intro-geo-bg {
    display: none;
  }
}
</style>
