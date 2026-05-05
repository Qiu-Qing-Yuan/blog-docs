<template>
  <div class="hero w-full relative h-[300px] sm:h-[400px] flex justify-center items-center overflow-hidden" :style="homeBanner.bannerOptions.bgImageStyle">
    <!--轮播图 -->
    <div id="banner" class="w-full absolute z-0 overflow-hidden">
      <img v-for="(item, index) in images" :key="item" :src="item" class="absolute w-full h-full object-cover transition-opacity duration-1000" :class="{ 'opacity-100': index === homeBanner.currentIndex.value, 'opacity-0': index !== homeBanner.currentIndex.value }" loading="eager" />
    </div>
    <!--渐变遮罩层 -->
    <div class="absolute inset-0 z-[5] bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
    <!--标题 -->
    <div class="index z-100 absolute text-[#fff] text-center px-4">
      <!--主标题 -->
      <div>
        <h1 v-if="`${homeBanner.bannerOptions.heroText instanceof Array}`" class="typed inline-block text-[1.2rem] font-[600] sm:text-[2.8rem] drop-shadow-lg"></h1>
        <h1 v-else class="typed inline-block text-[1.2rem] font-[600] sm:text-[2.8rem] drop-shadow-lg">vuePress-theme-Anyfork</h1>
      </div>
      <!--副标题-->
      <p v-if="homeBanner.bannerOptions.tagline" class="text-[0.85rem] sm:text-[1.4rem] sm:my-5 opacity-90 drop-shadow-md">
        {{ homeBanner.bannerOptions.tagline || 'Welcome to your vuePress-theme-AnyFork site' }}
      </p>
      <!--向下箭头 -->
      <a v-if="homeBanner.bannerOptions.showArrow" class="anchor-down" @click="scrollFn"></a>
    </div>
    <!--首页图片气泡-->
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
@-webkit-keyframes bounce-in {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  80% {
    transform: translateY(0);
  }
  to {
    transform: translateY(0);
  }
}

.typed-cursor {
  font-size: 2.6rem;
}
.anchor-down {
  display: block;
  width: 15px;
  height: 15px;
  font-size: 30px;
  text-align: center;
  animation: bounce-in 5s 3s infinite;
  position: absolute;
  left: 50%;
  bottom: -50%;
  margin-left: -10px;
  cursor: pointer;
  z-index: 10000;
}

.anchor-down::before {
  content: '';
  width: 15px;
  height: 15px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
  position: absolute;
  bottom: 10px;
}
.anchor-down::after {
  content: '';
  width: 15px;
  height: 15px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
}
@media (max-width: 640px) {
  .typed-cursor {
    font-size: 1.2rem;
  }
  .anchor-down {
    display: block;
    width: 10px;
    height: 10px;
    font-size: 30px;
    text-align: center;
    animation: bounce-in 5s 3s infinite;
    position: absolute;
    left: 50%;
    bottom: -50%;
    margin-left: -10px;
    cursor: pointer;
    z-index: 10000;
  }

  .anchor-down::before {
    content: '';
    width: 10px;
    height: 10px;
    display: block;
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
    transform: rotate(135deg);
    position: absolute;
    bottom: 10px;
  }
  .anchor-down::after {
    content: '';
    width: 10px;
    height: 10px;
    display: block;
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
    transform: rotate(135deg);
  }
}
</style>
