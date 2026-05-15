<template>
  <footer class="footer-wrapper mt-[48px]">
    <div class="max-w-[900px] mx-auto px-[20px]">
      <!-- 顶部渐变分隔 -->
      <div class="h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent mb-[24px]"></div>

      <!-- 主体内容 -->
      <div class="flex flex-col items-center gap-[20px] py-[16px]">
        <!-- 站点信息 -->
        <div class="flex flex-col items-center gap-[6px]">
          <span class="text-[15px] font-serif font-[700] tracking-tight text-[#1a1a2e] dark:text-[#e2e0da]">沉潜</span>
          <span class="text-[12px] text-[#9494a8] tracking-wider">AI / ML / NLP / CV</span>
        </div>

        <!-- 运行时间 -->
        <div class="running-time-wrapper">
          <div class="flex items-center gap-[6px]">
            <div class="w-[5px] h-[5px] rounded-full bg-[#1a5c3a] dark:bg-[#4eca8a] animate-pulse-soft"></div>
            <span class="text-[11px] text-[#9494a8] tracking-widest uppercase font-sans">已运行</span>
          </div>
          <div class="flex items-center gap-[4px] mt-[10px]">
            <div class="time-block">
              <span class="time-num">{{ timeData.days }}</span>
              <span class="time-label">天</span>
            </div>
            <span class="time-sep">:</span>
            <div class="time-block">
              <span class="time-num">{{ timeData.hours }}</span>
              <span class="time-label">时</span>
            </div>
            <span class="time-sep">:</span>
            <div class="time-block">
              <span class="time-num">{{ timeData.minutes }}</span>
              <span class="time-label">分</span>
            </div>
            <span class="time-sep">:</span>
            <div class="time-block">
              <span class="time-num">{{ timeData.seconds }}</span>
              <span class="time-label">秒</span>
            </div>
          </div>
        </div>

        <!-- 社交链接 -->
        <div class="flex items-center gap-[10px]">
          <a v-for="(item, index) in socialLinks" :key="index" :href="item.link" target="_blank" class="inline-flex items-center justify-center w-[32px] h-[32px] rounded-[8px] text-[#9494a8] dark:text-[#5a5a72] transition-all duration-300 hover:text-[#1a5c3a] dark:hover:text-[#4eca8a] hover:bg-[rgba(26,92,58,0.06)] dark:hover:bg-[rgba(78,202,138,0.06)]">
            <Icon :icon="item.icon" :iconSize="16" />
          </a>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="flex flex-wrap justify-center items-center gap-[6px] pt-[16px] border-t border-[var(--border-subtle)]">
        <span class="text-[11px] text-[#b0b0c0] dark:text-[#475569]">
          <Icon icon="CopyrightCircleOutlined" :iconSize="11" class="opacity-40" /> {{ currentYear }} 游履平生
        </span>
        <span class="text-[#d0d0dd] dark:text-[#2a2e3e] text-[10px]">&#183;</span>
        <span class="inline-flex items-center text-[11px] text-[#b0b0c0] dark:text-[#475569]">
          <Icon icon="FireOutlined" :iconSize="11" class="opacity-30">
            <span class="waline-pageview-count" data-path="/blog-docs/" style="padding-left: 3px; font-size: 11px;"></span>
          </Icon>
        </span>
        <span class="text-[#d0d0dd] dark:text-[#2a2e3e] text-[10px]">&#183;</span>
        <span class="text-[11px] text-[#b0b0c0] dark:text-[#475569]">Powered by VuePress</span>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
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

// 网站上线时间（持久化到 localStorage，刷新不会重置）
const SITE_START_KEY = 'site-start-time'
const storedStart = localStorage.getItem(SITE_START_KEY)
const startDate = storedStart ? new Date(storedStart) : new Date()
if (!storedStart) {
  localStorage.setItem(SITE_START_KEY, startDate.toISOString())
}
const timeData = reactive({ days: '000', hours: '00', minutes: '00', seconds: '00' })
let timer: ReturnType<typeof setInterval> | null = null

const pad = (n: number, len = 2) => String(n).padStart(len, '0')

const updateRunningTime = () => {
  const now = new Date()
  const diff = now.getTime() - startDate.getTime()

  timeData.days = pad(Math.floor(diff / (1000 * 60 * 60 * 24)), 3)
  timeData.hours = pad(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  timeData.minutes = pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
  timeData.seconds = pad(Math.floor((diff % (1000 * 60)) / 1000))
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

<style scoped>
.running-time-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 28px;
  border-radius: var(--radius-md, 14px);
  background: rgba(26, 92, 58, 0.025);
  border: 1px solid rgba(26, 92, 58, 0.06);
}

.dark .running-time-wrapper {
  background: rgba(78, 202, 138, 0.03);
  border-color: rgba(78, 202, 138, 0.06);
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 42px;
  padding: 6px 10px;
  border-radius: var(--radius-sm, 8px);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(26, 92, 58, 0.05);
}

.dark .time-block {
  background: rgba(20, 24, 34, 0.5);
  border-color: rgba(78, 202, 138, 0.05);
}

.time-num {
  font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace);
  font-size: 18px;
  font-weight: 700;
  color: #1a5c3a;
  line-height: 1;
  letter-spacing: -0.02em;
}

.dark .time-num {
  color: #4eca8a;
}

.time-label {
  font-family: var(--font-sans, 'Source Sans 3', sans-serif);
  font-size: 10px;
  color: #9494a8;
  margin-top: 4px;
  letter-spacing: 0.05em;
}

.time-sep {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  color: rgba(26, 92, 58, 0.25);
  margin: 0 2px;
  align-self: flex-start;
  padding-top: 6px;
}

.dark .time-sep {
  color: rgba(78, 202, 138, 0.25);
}
</style>
