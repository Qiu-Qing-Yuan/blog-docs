<template>
  <div class="hero w-full relative h-[320px] sm:h-[440px] flex justify-center items-center overflow-hidden" :style="homeBanner.bannerOptions.bgImageStyle">
    <!-- 轮播图 -->
    <div id="banner" class="w-full absolute z-0 overflow-hidden">
      <img v-for="(item, index) in images" :key="item" :src="item" class="absolute w-full h-full object-cover transition-opacity duration-[1200ms]" :class="{ 'opacity-100': index === homeBanner.currentIndex.value, 'opacity-0': index !== homeBanner.currentIndex.value }" loading="eager" />
    </div>
    <!-- 渐变遮罩层 -->
    <div class="absolute inset-0 z-[5] bg-gradient-to-b from-black/30 via-black/15 to-black/50"></div>
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
/* ─── 主标题 ─── */
.hero-title {
  display: inline-block;
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
  margin: 0;
  line-height: 1.3;
}

/* ─── 装饰线 ─── */
.hero-divider {
  width: 48px;
  height: 2px;
  margin: 16px auto;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 1px;
}

/* ─── 副标题 ─── */
.hero-tagline {
  font-size: 1.05rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.06em;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  max-width: 560px;
  line-height: 1.7;
  margin: 0;
}

/* ─── 光标 ─── */
.typed-cursor {
  font-size: 2.4rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
}

/* ─── 向下箭头 ─── */
@keyframes float-down {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50%      { transform: translateY(8px); opacity: 1; }
}

.anchor-down {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 100;
  animation: float-down 2.5s ease-in-out infinite;
}

.anchor-down::before,
.anchor-down::after {
  content: '';
  position: absolute;
  border-right: 1.5px solid rgba(255, 255, 255, 0.8);
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.8);
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
  opacity: 0.5;
}

.anchor-down:hover {
  animation-play-state: paused;
}

.anchor-down:hover::before,
.anchor-down:hover::after {
  border-color: rgba(255, 255, 255, 1);
}

/* ─── 移动端 ─── */
@media (max-width: 640px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .hero-divider {
    width: 36px;
    margin: 12px auto;
  }

  .hero-tagline {
    font-size: 0.85rem;
    letter-spacing: 0.03em;
  }

  .typed-cursor {
    font-size: 1.4rem;
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
