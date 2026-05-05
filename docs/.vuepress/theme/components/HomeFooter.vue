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
        <div class="running-time-wrapper">
          <div class="flex items-center gap-[6px]">
            <div class="w-[5px] h-[5px] rounded-full bg-[#2c7a5a] animate-pulse-soft"></div>
            <span class="text-[11px] text-[#94a3b8] tracking-widest uppercase">已运行</span>
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

// 网站上线时间
const startDate = new Date('2022-01-01T00:00:00')
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
  padding: 14px 24px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(44, 122, 90, 0.03), rgba(62, 175, 124, 0.02));
  border: 1px solid rgba(44, 122, 90, 0.08);
}

.dark .running-time-wrapper {
  background: linear-gradient(135deg, rgba(78, 202, 138, 0.04), rgba(44, 122, 90, 0.02));
  border-color: rgba(78, 202, 138, 0.08);
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 40px;
  padding: 6px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(44, 122, 90, 0.06);
}

.dark .time-block {
  background: rgba(20, 24, 34, 0.6);
  border-color: rgba(78, 202, 138, 0.06);
}

.time-num {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 18px;
  font-weight: 700;
  color: #2c7a5a;
  line-height: 1;
  letter-spacing: -0.02em;
}

.dark .time-num {
  color: #4eca8a;
}

.time-label {
  font-size: 10px;
  color: #94a3b8;
  margin-top: 4px;
  letter-spacing: 0.05em;
}

.time-sep {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  color: rgba(44, 122, 90, 0.3);
  margin: 0 2px;
  align-self: flex-start;
  padding-top: 6px;
}

.dark .time-sep {
  color: rgba(78, 202, 138, 0.3);
}
</style>
