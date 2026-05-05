<template>
  <footer class="footer-wrapper mt-[48px]">
    <div class="max-w-[900px] mx-auto px-[20px]">
      <!-- 顶部渐变分隔 -->
      <div class="h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent dark:via-[rgba(255,255,255,0.06)] mb-[24px]"></div>

      <!-- 主体内容 -->
      <div class="flex flex-col items-center gap-[20px] py-[16px]">
        <!-- 站点信息 -->
        <div class="flex flex-col items-center gap-[6px]">
          <span class="text-[14px] font-[700] tracking-tight text-[#1e293b] dark:text-[#e2e8f0]">论文阅读笔记</span>
          <span class="text-[12px] text-[#94a3b8]">AI/ML/NLP/CV 方向论文阅读与思考</span>
        </div>

        <!-- 运行时间 -->
        <div class="inline-flex items-center gap-[8px] text-[12px] text-[#94a3b8] bg-[#f8fafb] dark:bg-[#1a1e2e] px-[18px] py-[8px] rounded-[12px] border border-[#e2e8f0]/40 dark:border-[rgba(255,255,255,0.04)]">
          <div class="w-[6px] h-[6px] rounded-full bg-[#2c7a5a] animate-pulse-soft"></div>
          <span class="font-mono text-[#2c7a5a] font-[600] text-[13px] tracking-tight tabular-nums">{{ runningTime }}</span>
        </div>

        <!-- 社交链接 -->
        <div class="flex items-center gap-[10px]">
          <a v-for="(item, index) in socialLinks" :key="index" :href="item.link" target="_blank" class="inline-flex items-center justify-center w-[32px] h-[32px] rounded-[8px] text-[#94a3b8] dark:text-[#64748b] transition-all duration-300 hover:text-[#2c7a5a] dark:hover:text-[#4eca8a] hover:bg-[#f0faf6] dark:hover:bg-[rgba(78,202,138,0.06)]">
            <Icon :icon="item.icon" :iconSize="16" />
          </a>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="flex flex-wrap justify-center items-center gap-[6px] pt-[16px] border-t border-[#f1f5f9] dark:border-[rgba(255,255,255,0.04)]">
        <span class="text-[11px] text-[#cbd5e1] dark:text-[#475569]">
          <Icon icon="CopyrightCircleOutlined" :iconSize="11" class="opacity-50" /> {{ currentYear }} 游履平生
        </span>
        <span class="text-[#e2e8f0] dark:text-[#1e293b] text-[10px]">&#183;</span>
        <span class="inline-flex items-center text-[11px] text-[#cbd5e1] dark:text-[#475569]">
          <Icon icon="FireOutlined" :iconSize="11" class="opacity-40">
            <span class="waline-pageview-count" data-path="/" style="padding-left: 3px; font-size: 11px;"></span>
          </Icon>
        </span>
        <span class="text-[#e2e8f0] dark:text-[#1e293b] text-[10px]">&#183;</span>
        <span class="text-[11px] text-[#cbd5e1] dark:text-[#475569]">Powered by VuePress</span>
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

const currentYear = new Date().getFullYear()

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

  runningTime.value = `${days}d ${hours}h ${minutes}m ${seconds}s`
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
