<template>
  <div class="sm:w-[var(--content-width)] mx-auto px-6 mb-[24px]">
    <div class="bg-[var(--surface-muted)] rounded-[14px] border border-[var(--border-subtle)] p-[20px]">
      <!-- 标题 -->
      <div class="flex items-center gap-[8px] mb-[16px]">
        <Icon icon="BarChartOutlined" :iconSize="16" class="text-[#1a5c3a] dark:text-[#4eca8a]" />
        <span class="text-[14px] font-[600] text-[#475569] dark:text-[#94a3b8]">文章统计</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-[12px]">
        <!-- 浏览量 -->
        <div class="bg-white dark:bg-[#1a1d2e] rounded-[10px] p-[14px] text-center border border-[var(--border-subtle)]">
          <div class="text-[20px] font-[700] text-[#1a5c3a] dark:text-[#4eca8a] font-mono tabular-nums flex items-center justify-center gap-[4px]">
            <Icon icon="EyeOutlined" :iconSize="14" class="opacity-50" />
            <span class="waline-pageview-count" :data-path="pagePath">0</span>
          </div>
          <div class="text-[11px] text-[#9494a8] mt-[4px] uppercase tracking-wider">浏览量</div>
        </div>

        <!-- 字数 -->
        <div class="bg-white dark:bg-[#1a1d2e] rounded-[10px] p-[14px] text-center border border-[var(--border-subtle)]">
          <div class="text-[20px] font-[700] text-[#2d8cf0] font-mono tabular-nums flex items-center justify-center gap-[4px]">
            <Icon icon="FileTextOutlined" :iconSize="14" class="opacity-50" />
            {{ wordCount }}
          </div>
          <div class="text-[11px] text-[#9494a8] mt-[4px] uppercase tracking-wider">字数</div>
        </div>

        <!-- 阅读时间 -->
        <div class="bg-white dark:bg-[#1a1d2e] rounded-[10px] p-[14px] text-center border border-[var(--border-subtle)]">
          <div class="text-[20px] font-[700] text-[#c9963b] font-mono tabular-nums flex items-center justify-center gap-[4px]">
            <Icon icon="FieldTimeOutlined" :iconSize="14" class="opacity-50" />
            {{ readingTime }}
          </div>
          <div class="text-[11px] text-[#9494a8] mt-[4px] uppercase tracking-wider">阅读时间</div>
        </div>

        <!-- 发布日期 -->
        <div class="bg-white dark:bg-[#1a1d2e] rounded-[10px] p-[14px] text-center border border-[var(--border-subtle)]">
          <div class="text-[14px] font-[700] text-[#722ed1] font-mono tabular-nums flex items-center justify-center gap-[4px]">
            <Icon icon="CalendarOutlined" :iconSize="14" class="opacity-50" />
            {{ publishDate }}
          </div>
          <div class="text-[11px] text-[#9494a8] mt-[4px] uppercase tracking-wider">发布日期</div>
        </div>
      </div>

      <!-- 更新时间 -->
      <div v-if="lastUpdated" class="mt-[12px] text-center text-[12px] text-[#9494a8]">
        最后更新于 {{ lastUpdated }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from '@vuepress/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const props = defineProps<{
  page: Record<string, any>
}>()

const pagePath = computed(() => withBase(props.page.path))

// 字数统计（从页面内容提取）
const wordCount = computed(() => {
  const content = props.page.content || ''
  // 去掉 markdown 标记，计算中文字符 + 英文单词
  const clean = content
    .replace(/```[\s\S]*?```/g, '') // 去掉代码块
    .replace(/<[^>]+>/g, '') // 去掉 HTML 标签
    .replace(/[#*`\[\]()>~\-|]/g, '') // 去掉 markdown 符号
    .trim()
  const count = clean.length
  if (count >= 10000) return (count / 10000).toFixed(1) + 'w'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'k'
  return count.toString()
})

// 阅读时间（按每分钟 300 字计算）
const readingTime = computed(() => {
  const content = props.page.content || ''
  const clean = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#*`\[\]()>~\-|]/g, '')
    .trim()
  const minutes = Math.max(1, Math.ceil(clean.length / 300))
  return `${minutes} 分钟`
})

// 发布日期
const publishDate = computed(() => {
  const date = props.page.frontmatter?.date
  if (!date) return '-'
  return dayjs.tz(date, 'Asia/Shanghai').format('YYYY-MM-DD')
})

// 最后更新时间
const lastUpdated = computed(() => {
  return props.page.git?.updatedTime
    ? dayjs(props.page.git.updatedTime).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm')
    : ''
})
</script>
