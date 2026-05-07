<template>
  <div class="mt-[16px]">
    <Icon icon="BarChartOutlined" text="访问统计" :textSize="13" class="font-[600] text-[#475569] dark:text-[#9494a8] tracking-wide" />
    <div class="mt-[10px] space-y-[8px]">
      <!-- 文章总数 -->
      <div class="flex items-center justify-between px-[12px] py-[8px] bg-[var(--surface-muted)] rounded-[10px] border border-[var(--border-subtle)]">
        <span class="text-[12px] text-[#5a5a72] dark:text-[#9494a8] flex items-center gap-[6px]">
          <Icon icon="FileTextOutlined" :iconSize="13" class="opacity-50" />
          文章总数
        </span>
        <span class="text-[14px] font-[700] text-[#1a5c3a] dark:text-[#4eca8a] font-mono tabular-nums">{{ post.items.length }}</span>
      </div>
      <!-- 分类数 -->
      <div class="flex items-center justify-between px-[12px] py-[8px] bg-[var(--surface-muted)] rounded-[10px] border border-[var(--border-subtle)]">
        <span class="text-[12px] text-[#5a5a72] dark:text-[#9494a8] flex items-center gap-[6px]">
          <Icon icon="AppstoreOutlined" :iconSize="13" class="opacity-50" />
          分类数量
        </span>
        <span class="text-[14px] font-[700] text-[#2d8cf0] font-mono tabular-nums">{{ Object.keys(category.map).length }}</span>
      </div>
      <!-- 标签数 -->
      <div class="flex items-center justify-between px-[12px] py-[8px] bg-[var(--surface-muted)] rounded-[10px] border border-[var(--border-subtle)]">
        <span class="text-[12px] text-[#5a5a72] dark:text-[#9494a8] flex items-center gap-[6px]">
          <Icon icon="TagsOutlined" :iconSize="13" class="opacity-50" />
          标签数量
        </span>
        <span class="text-[14px] font-[700] text-[#c9963b] font-mono tabular-nums">{{ Object.keys(tag.map).length }}</span>
      </div>
      <!-- 今日日期 -->
      <div class="flex items-center justify-between px-[12px] py-[8px] bg-[var(--surface-muted)] rounded-[10px] border border-[var(--border-subtle)]">
        <span class="text-[12px] text-[#5a5a72] dark:text-[#9494a8] flex items-center gap-[6px]">
          <Icon icon="CalendarOutlined" :iconSize="13" class="opacity-50" />
          今日日期
        </span>
        <span class="text-[13px] font-[600] text-[#475569] dark:text-[#94a3b8] font-mono">{{ today }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogCategory, useBlogType } from 'vuepress-plugin-blog2/lib/client'
import dayjs from 'dayjs'

const category = useBlogCategory('category')
const tag = useBlogCategory('tag')
const post = useBlogType('article')
const today = dayjs().format('YYYY-MM-DD')
</script>
