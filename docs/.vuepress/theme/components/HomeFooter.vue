<template>
  <footer class="footer-wrapper mt-[48px] py-[36px] text-center">
    <div class="max-w-[900px] mx-auto px-[20px]">
      <!-- 顶部装饰线 -->
      <div class="flex items-center gap-[16px] mb-[28px]">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent dark:via-[rgba(255,255,255,0.06)]"></div>
        <span class="text-[#cbd5e1] dark:text-[#475569] text-[14px]">&#9670;</span>
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent dark:via-[rgba(255,255,255,0.06)]"></div>
      </div>
      <!-- 社交链接 -->
      <div class="flex justify-center gap-[14px] mb-[20px]">
        <a v-for="(item, index) in socialLinks" :key="index" :href="item.link" target="_blank" class="inline-flex items-center justify-center w-[36px] h-[36px] rounded-[10px] bg-[#f8fafb] dark:bg-[#1a1e2e] text-[#64748b] dark:text-[#94a3b8] border border-[#e2e8f0]/50 dark:border-[rgba(255,255,255,0.05)] transition-all duration-300 hover:bg-[#2c7a5a] hover:text-[#fff] hover:border-[#2c7a5a] hover:scale-105 hover:shadow-lg">
          <Icon :icon="item.icon" :iconSize="16" />
        </a>
      </div>
      <!-- 运行时间 -->
      <div class="mb-[16px] text-[12.5px] text-[#94a3b8]">
        <span class="inline-flex items-center gap-[6px] bg-[#f8fafb] dark:bg-[#1a1e2e] px-[16px] py-[6px] rounded-full border border-[#e2e8f0]/40 dark:border-[rgba(255,255,255,0.04)]">
          <Icon icon="ClockCircleOutlined" :iconSize="13" class="opacity-40" />
          <span>本站已运行</span>
          <span class="font-mono text-[#2c7a5a] font-[600] tracking-tight">{{ runningTime }}</span>
        </span>
      </div>
      <!-- 版权信息 -->
      <div class="flex flex-wrap justify-center items-center gap-[14px] text-[12px] text-[#94a3b8]">
        <Icon icon="CopyrightCircleOutlined" text="游履平生 2022" :textSize="12" />
        <span class="hidden sm:inline text-[#e2e8f0] dark:text-[#1e293b]">&#124;</span>
        <Icon icon="FireOutlined" class="text-[12px]" :iconSize="13">
          <span class="waline-pageview-count" data-path="/" style="padding-left: 4px"></span>
        </Icon>
      </div>
      <!-- Powered by -->
      <div class="mt-[16px] text-[11px] text-[#cbd5e1] dark:text-[#334155] tracking-wider">
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
