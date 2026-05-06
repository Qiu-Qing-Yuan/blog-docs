<template>
  <div class="hero w-full relative h-[320px] sm:h-[440px] flex justify-center items-center overflow-hidden" :style="homeBanner.bannerOptions.bgImageStyle">
    <!-- 轮播图 -->
    <div id="banner" class="w-full absolute z-0 overflow-hidden">
      <img v-for="(item, index) in images" :key="item" :src="item" class="absolute w-full h-full object-cover transition-opacity duration-[1200ms]" :class="{ 'opacity-100': index === homeBanner.currentIndex.value, 'opacity-0': index !== homeBanner.currentIndex.value }" loading="eager" />
    </div>
    <!-- 渐变遮罩层 -->
    <div class="absolute inset-0 z-[5] hero-overlay"></div>
    <!-- 内容 -->
    <div class="index z-100 absolute text-[#fff] text-center px-6 flex flex-col items-center">
      <!-- 主标题 -->
      <div class="hero-title-wrapper">
        <h1 v-if="`${homeBanner.bannerOptions.heroText instanceof Array}`" class="typed hero-title"></h1>
        <h1 v-else class="typed hero-title">论文阅读笔记</h1>
      </div>
      <!-- 装饰线 -->
      <div class="hero-divider"></div>
      <!-- 副标题 -->
      <p v-if="homeBanner.bannerOptions.tagline" class="hero-tagline">
        {{ homeBanner.bannerOptions.tagline || 'Welcome to your vuePress-theme-AnyFork site' }}
      </p>
    </div>
    <!-- 向下箭头 -->
    <a v-if="homeBanner.bannerOptions.showArrow" class="anchor-down" @click="scrollFn"></a>
    <!-- 气泡动效 -->
    <div v-if="homeBanner.bannerOptions.bubbles" id="bubbles" class="absolute w-full h-full z-[10]"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useTyped, useBanner, useCircleMagic } from '../composables'
const homeBanner = useBanner()
useTyped()
useCircleMagic()
const mixImage = homeBanner.getRandomImage()
const images = Array.isArray(mixImage) ? mixImage : [mixImage]

onMounted(() => {
  homeBanner.startAutoplay(images)
})

const scrollFn = () => {
  const windowH = document.getElementsByClassName('hero')[0].clientHeight
  document.documentElement.scrollTop = windowH
}
</script>
<style lang="css">
/* ─── 遮罩层 ─── */
.hero-overlay {
  background:
    linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.35) 100%),
    radial-gradient(ellipse at 50% 80%, transparent 50%, rgba(0,0,0,0.2) 100%);
}

/* ─── 主标题 ─── */
.hero-title {
  display: inline-block;
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 0, 0, 0.15);
  margin: 0;
  line-height: 1.3;
}

/* ─── 装饰线 ─── */
.hero-divider {
  width: 40px;
  height: 1.5px;
  margin: 18px auto;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
  border-radius: 1px;
  position: relative;
}

.hero-divider::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
}

/* ─── 副标题 ─── */
.hero-tagline {
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.08em;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.25);
  max-width: 520px;
  line-height: 1.8;
  margin: 0;
}

/* ─── 光标 ─── */
.typed-cursor {
  font-family: 'Playfair Display', serif;
  font-size: 2.6rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
}

/* ─── 向下箭头 ─── */
@keyframes float-down {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%      { transform: translateY(10px); opacity: 0.9; }
}

.anchor-down {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 100;
  animation: float-down 2.8s ease-in-out infinite;
}

.anchor-down::before,
.anchor-down::after {
  content: '';
  position: absolute;
  border-right: 1.5px solid rgba(255, 255, 255, 0.6);
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.6);
  transform: rotate(45deg);
}

.anchor-down::before {
  width: 10px;
  height: 10px;
  left: 4px;
  top: 2px;
}

.anchor-down::after {
  width: 7px;
  height: 7px;
  left: 6px;
  top: 8px;
  opacity: 0.4;
}

.anchor-down:hover {
  animation-play-state: paused;
}

.anchor-down:hover::before,
.anchor-down:hover::after {
  border-color: rgba(255, 255, 255, 0.9);
}

/* ─── 移动端 ─── */
@media (max-width: 640px) {
  .hero-title {
    font-size: 1.6rem;
  }

  .hero-divider {
    width: 32px;
    margin: 14px auto;
  }

  .hero-tagline {
    font-size: 0.85rem;
    letter-spacing: 0.04em;
  }

  .typed-cursor {
    font-size: 1.5rem;
  }

  .anchor-down {
    bottom: 16px;
    width: 20px;
    height: 20px;
  }

  .anchor-down::before {
    width: 8px;
    height: 8px;
    left: 3px;
    top: 2px;
  }

  .anchor-down::after {
    width: 6px;
    height: 6px;
    left: 5px;
    top: 6px;
  }
}
</style>
