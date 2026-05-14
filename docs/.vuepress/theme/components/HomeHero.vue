<template>
  <div class="hero-container" ref="containerRef">
    <!-- ═══════ 第一屏：深色英雄区 ═══════ -->
    <section class="hero-section" ref="heroRef">
      <!-- 背景几何线框 -->
      <div class="geo-shapes" ref="geoRef">
        <svg class="geo-wireframe geo-wireframe-1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,10 180,50 180,130 100,170 20,130 20,50" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <polygon points="100,30 160,60 160,120 100,150 40,120 40,60" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.6"/>
          <line x1="100" y1="10" x2="100" y2="170" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
          <line x1="20" y1="50" x2="180" y2="130" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
          <line x1="180" y1="50" x2="20" y2="130" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
          <polygon points="100,10 180,50 180,130 100,170 20,130 20,50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        </svg>
        <svg class="geo-wireframe geo-wireframe-2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.7"/>
          <polygon points="100,40 150,65 150,135 100,160 50,135 50,65" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
          <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.04)" stroke-width="0.4"/>
          <line x1="30" y1="60" x2="170" y2="140" stroke="rgba(255,255,255,0.04)" stroke-width="0.4"/>
          <line x1="170" y1="60" x2="30" y2="140" stroke="rgba(255,255,255,0.04)" stroke-width="0.4"/>
        </svg>
        <svg class="geo-wireframe geo-wireframe-3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,15 175,55 175,145 100,185 25,145 25,55" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.6"/>
          <polygon points="100,35 155,60 155,140 100,165 45,140 45,60" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.4"/>
          <line x1="100" y1="15" x2="100" y2="185" stroke="rgba(255,255,255,0.03)" stroke-width="0.3"/>
          <line x1="25" y1="55" x2="175" y2="145" stroke="rgba(255,255,255,0.03)" stroke-width="0.3"/>
          <line x1="175" y1="55" x2="25" y2="145" stroke="rgba(255,255,255,0.03)" stroke-width="0.3"/>
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
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a class="hero-btn-secondary" :href="secondaryBtnLink">
            <span>{{ secondaryBtnText }}</span>
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      <!-- 左侧 HOME 文字 -->
      <div class="side-label side-label-left">HOME</div>

      <!-- 右侧 SCROLL DOWN 圆形指示器 -->
      <div class="scroll-indicator" @click="scrollToNext">
        <svg class="scroll-circle" viewBox="0 0 100 100">
          <defs>
            <path id="scrollTextPath" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"/>
          </defs>
          <text class="scroll-text">
            <textPath href="#scrollTextPath">· SCROLL DOWN · SCROLL DOWN · SCROLL DOWN</textPath>
          </text>
        </svg>
        <div class="scroll-arrow-down">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
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
      <div class="side-label side-label-right" @click="scrollToTop">BACK TO TOP</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ─── 配置 ───
const heroTitleLine1 = '论文阅读笔记'
const heroTitleLine2 = '个人技术博客'
const heroSubtitle = '探索人工智能前沿，记录学习与思考'
const primaryBtnText = '开始探索'
const primaryBtnLink = '#articles'
const secondaryBtnText = '了解更多'
const secondaryBtnLink = '#about'

const featureCards = [
  { title: '深度学习', desc: '从理论到实践的完整探索' },
  { title: '工程实践', desc: '生产环境中的最佳实践' }
]

const aboutHighlight = '一个专注于人工智能与软件工程的技术博客'
const aboutDesc = '在这里记录论文阅读笔记、技术探索和项目实践，分享从理论到落地的完整思考过程。'
const aboutTags = ['论文笔记', '深度学习', '工程实践', '开源项目']

// ─── 引用 ───
const containerRef = ref<HTMLElement>()
const heroRef = ref<HTMLElement>()
const introRef = ref<HTMLElement>()
const geoRef = ref<HTMLElement>()
const introLeftRef = ref<HTMLElement>()
const introRightRef = ref<HTMLElement>()
const aboutCardRef = ref<HTMLElement>()

let scrollHandler: (() => void) | null = null

onMounted(() => {
  const hero = heroRef.value
  const intro = introRef.value
  const geoShapes = geoRef.value
  const introLeft = introLeftRef.value
  const introRight = introRightRef.value
  const aboutCard = aboutCardRef.value

  if (!hero || !intro) return

  // ─── 滚动动画 ───
  scrollHandler = () => {
    const scrollY = window.scrollY
    const heroH = hero.offsetHeight

    // 几何形状随滚动旋转
    if (geoShapes) {
      const shapes = geoShapes.querySelectorAll('.geo-wireframe')
      shapes.forEach((shape, i) => {
        const speed = 0.05 + i * 0.03
        const rotate = scrollY * speed
        const scale = 1 + Math.sin(scrollY * 0.002) * 0.1
        ;(shape as HTMLElement).style.transform = `rotate(${rotate}deg) scale(${scale})`
      })
    }

    // 英雄区视差 + 淡出
    if (hero) {
      const progress = Math.min(scrollY / heroH, 1)
      hero.style.opacity = `${1 - progress * 0.6}`
      hero.style.transform = `translateY(${scrollY * 0.3}px)`
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
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.1s linear;
}

/* ─── 几何线框 ─── */
.geo-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.geo-wireframe {
  position: absolute;
  transition: transform 0.05s linear;
  will-change: transform;
}

.geo-wireframe-1 {
  width: 320px;
  height: 320px;
  top: 5%;
  left: 5%;
  opacity: 0.7;
}

.geo-wireframe-2 {
  width: 400px;
  height: 400px;
  top: -5%;
  right: 5%;
  opacity: 0.5;
}

.geo-wireframe-3 {
  width: 260px;
  height: 260px;
  bottom: 10%;
  right: 25%;
  opacity: 0.4;
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
  margin: 0 0 24px 0;
}

.title-line {
  display: block;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.title-bold {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  color: #ffffff;
}

.title-light {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
}

.hero-subtitle {
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.02em;
  margin: 0 0 40px 0;
  max-width: 480px;
}

/* ─── 按钮 ─── */
.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: #e8920d;
  color: #000;
  border-radius: 100px;
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-btn-primary:hover {
  background: #f5a623;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(232, 146, 13, 0.3);
}

.hero-btn-primary .btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.hero-btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-btn-secondary:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.hero-btn-secondary .btn-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.hero-btn-secondary:hover .btn-arrow {
  transform: translateX(4px);
}

/* ─── 左侧 HOME 标签 ─── */
.side-label {
  position: absolute;
  font-family: 'Source Sans 3', monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  cursor: pointer;
  z-index: 20;
  transition: color 0.3s ease;
}

.side-label-left {
  left: 24px;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  color: rgba(255, 255, 255, 0.35);
}

.side-label-left:hover {
  color: rgba(255, 255, 255, 0.7);
}

.side-label-right {
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.3);
}

.side-label-right:hover {
  color: rgba(0, 0, 0, 0.6);
}

/* ─── SCROLL DOWN 圆形指示器 ─── */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  right: 60px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  z-index: 20;
  animation: scroll-rotate 8s linear infinite;
}

.scroll-circle {
  width: 100%;
  height: 100%;
}

.scroll-text {
  font-family: 'Source Sans 3', monospace;
  font-size: 5.5px;
  font-weight: 700;
  letter-spacing: 0.15em;
  fill: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
}

.scroll-arrow-down {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28px;
  height: 28px;
  background: #e8920d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
}

.scroll-arrow-down svg {
  width: 14px;
  height: 14px;
  animation: bounce-down 2s ease-in-out infinite;
}

@keyframes scroll-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
  opacity: 0.6;
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
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #111;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.intro-heading-light {
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
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
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
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
  border-radius: 16px;
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
  color: #e8920d;
  margin: 0 0 8px 0;
}

.feature-card-desc {
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
  font-size: 0.85rem;
  color: #888;
  margin: 0;
  line-height: 1.5;
}

/* ─── 关于卡片 ─── */
.about-card {
  background: #fff;
  border-radius: 20px;
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

.dot-orange { background: #e8920d; }
.dot-yellow { background: #f5c842; }
.dot-light { background: #e0d5c0; }

.about-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 12px 0;
}

.about-highlight {
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
  font-size: 0.95rem;
  color: #e8920d;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.about-desc {
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
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
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
  font-size: 0.78rem;
  color: #555;
  font-weight: 500;
  transition: all 0.2s ease;
}

.about-tag:hover {
  background: #e8920d;
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
    width: 70px;
    height: 70px;
    bottom: 24px;
    right: 24px;
  }

  .scroll-text {
    font-size: 4px;
  }

  .scroll-arrow-down {
    width: 22px;
    height: 22px;
  }

  .scroll-arrow-down svg {
    width: 11px;
    height: 11px;
  }

  .geo-wireframe-1 {
    width: 180px;
    height: 180px;
  }

  .geo-wireframe-2 {
    width: 220px;
    height: 220px;
  }

  .geo-wireframe-3 {
    width: 150px;
    height: 150px;
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
