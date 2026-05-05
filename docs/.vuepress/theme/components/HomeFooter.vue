<template>
  <footer class="footer-wrapper mt-[48px] py-[32px] text-center">
    <div class="max-w-[900px] mx-auto px-[15px]">
      <!-- 社交链接 -->
      <div class="flex justify-center gap-[16px] mb-[18px]">
        <a v-for="(item, index) in socialLinks" :key="index" :href="item.link" target="_blank" class="inline-flex items-center justify-center w-[34px] h-[34px] rounded-[10px] bg-[#f1f5f9] dark:bg-[#1e2233] text-[#64748b] dark:text-[#94a3b8] transition-all duration-300 hover:bg-[#2c7a5a] hover:text-[#fff] hover:scale-105 hover:shadow-md">
          <Icon :icon="item.icon" :iconSize="16" />
        </a>
      </div>
      <!-- 运行时间 -->
      <div class="mb-[14px] text-[12.5px] text-[#94a3b8]">
        <span class="inline-flex items-center gap-[5px]">
          <Icon icon="ClockCircleOutlined" :iconSize="13" class="opacity-50" />
          <span>本站已运行</span>
          <span class="font-mono text-[#2c7a5a] font-[600] tracking-tight">{{ runningTime }}</span>
        </span>
      </div>
      <!-- 版权信息 -->
      <div class="flex flex-wrap justify-center items-center gap-[14px] text-[12.5px] text-[#94a3b8]">
        <Icon icon="CopyrightCircleOutlined" text="游履平生 2022" :textSize="12" />
        <span class="hidden sm:inline text-[#e2e8f0] dark:text-[#1e293b]">|</span>
        <Icon icon="FireOutlined" class="text-[12px]" :iconSize="13">
          <span class="waline-pageview-count" data-path="/" style="padding-left: 4px"></span>
        </Icon>
      </div>
      <!-- Powered by -->
      <div class="mt-[14px] text-[11px] text-[#cbd5e1] dark:text-[#334155] tracking-wide">
        Powered by VuePress & Theme AnyFork
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCount } from '../composables'
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'

interface ThemeData {
  socialLinks?: Array<{ icon: string; link: string }>;
  [key: string]: any;
}

const themeData = useThemeData() as unknown as ThemeData
const socialLinks = themeData.value?.socialLinks || []
useCount()

// 网站上线时间
const startDate = new Date('2022-01-01T00:00:00')
const runningTime = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const updateRunningTime = () => {
  const now = new Date()
  const diff = now.getTime() - startDate.getTime()

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  runningTime.value = `${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`
}

onMounted(() => {
  updateRunningTime()
  timer = setInterval(updateRunningTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
