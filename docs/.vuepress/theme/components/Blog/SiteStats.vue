<template>
  <div class="mt-[16px]">
    <Icon icon="BarChartOutlined" text="访问统计" :textSize="13" class="font-[600] text-[#475569] dark:text-[#9494a8] tracking-wide" />
    <div class="mt-[10px] space-y-[8px]">
      <!-- 总访问量 -->
      <div class="flex items-center justify-between px-[12px] py-[8px] bg-[var(--surface-muted)] rounded-[10px] border border-[var(--border-subtle)]">
        <span class="text-[12px] text-[#5a5a72] dark:text-[#9494a8] flex items-center gap-[6px]">
          <Icon icon="EyeOutlined" :iconSize="13" class="opacity-50" />
          总访问量
        </span>
        <span class="text-[14px] font-[700] text-[#1a5c3a] dark:text-[#4eca8a] font-mono tabular-nums">
          {{ stats.loading ? '...' : formatNumber(stats.totalViews) }}
        </span>
      </div>
      <!-- 总评论数 -->
      <div class="flex items-center justify-between px-[12px] py-[8px] bg-[var(--surface-muted)] rounded-[10px] border border-[var(--border-subtle)]">
        <span class="text-[12px] text-[#5a5a72] dark:text-[#9494a8] flex items-center gap-[6px]">
          <Icon icon="MessageOutlined" :iconSize="13" class="opacity-50" />
          总评论数
        </span>
        <span class="text-[14px] font-[700] text-[#2d8cf0] font-mono tabular-nums">
          {{ stats.loading ? '...' : formatNumber(stats.totalComments) }}
        </span>
      </div>
      <!-- 最近评论 -->
      <div v-if="stats.recentComments.length" class="mt-[12px]">
        <div class="text-[11px] text-[#9494a8] uppercase tracking-wider mb-[8px] font-[600]">最近评论</div>
        <div v-for="comment in stats.recentComments" :key="comment.objectId" class="py-[8px] border-b border-[var(--border-subtle)] last:border-0">
          <div class="flex items-center gap-[6px] mb-[4px]">
            <span class="text-[12px] font-[600] text-[#475569] dark:text-[#94a3b8]">{{ comment.nick || '匿名' }}</span>
            <span class="text-[10px] text-[#9494a8]">{{ formatTime(comment.created) }}</span>
          </div>
          <p class="text-[11px] text-[#5a5a72] dark:text-[#9494a8] line-clamp-2 m-0 leading-[1.6]">{{ comment.comment?.replace(/<[^>]+>/g, '').slice(0, 60) }}...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { useStats } from '../../composables/useStats'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const { stats } = useStats()

const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

const formatTime = (timestamp: number) => {
  return dayjs(timestamp * 1000).fromNow()
}
</script>
