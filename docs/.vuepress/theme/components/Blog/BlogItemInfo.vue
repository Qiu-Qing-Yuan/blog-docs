<template>
  <div class="w-full items-center mt-[12px] sm:mt-[14px] sm:flex sm:h-8 flex-wrap gap-y-[6px] gap-x-[6px]">
    <!-- 论文作者 -->
    <span v-if="paper.authors" class="inline-flex items-center text-[12px] text-[#5a5a72] dark:text-[#9494a8] bg-[var(--surface-muted)] border border-[var(--border-subtle)] px-[10px] py-[3px] rounded-lg">
      <Icon icon="UserOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[4px] opacity-50" />{{ paper.authors }}
    </span>
    <!-- 会议/期刊 · 年份 -->
    <span v-if="venueText" class="inline-flex items-center text-[12px] text-[#1a5c3a] dark:text-[#4eca8a] bg-[rgba(26,92,58,0.06)] dark:bg-[rgba(78,202,138,0.08)] border border-[rgba(26,92,58,0.12)] dark:border-[rgba(78,202,138,0.12)] px-[10px] py-[3px] rounded-lg font-[600]">
      <Icon icon="ReadOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[4px] opacity-60" />{{ venueText }}
    </span>
    <!-- 发布日期 -->
    <span v-if="formatDateValue(page.frontmatter.date)" class="inline-flex items-center text-[12px] text-[#5a5a72] dark:text-[#9494a8] bg-[var(--surface-muted)] border border-[var(--border-subtle)] px-[10px] py-[3px] rounded-lg">
      <Icon icon="FieldTimeOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[4px] opacity-50" />{{ formatDateValue(page.frontmatter.date) }}
    </span>
    <!-- 分类 -->
    <span v-if="page.frontmatter.category" class="inline-flex items-center text-[12px] z-[300]">
      <Icon icon="AppstoreOutlined" :text="page.frontmatter.category" :iconSize="isMobile ? 11 : 13" :textSize="12" type="category" class="text-[#5a5a72] dark:text-[#9494a8]"></Icon>
    </span>
    <!-- 标签 -->
    <span v-if="page.frontmatter.tag" class="inline-flex items-center text-[12px] z-[300]">
      <Icon icon="TagsOutlined" :text="page.frontmatter.tag" :iconSize="isMobile ? 11 : 13" :textSize="12" type="tag" class="text-[#5a5a72] dark:text-[#9494a8]"></Icon>
    </span>
    <!-- 难度 -->
    <span v-if="page.frontmatter.difficulty" class="inline-flex items-center text-[11px] text-[#5a5a72] dark:text-[#9494a8] bg-[var(--surface-muted)] border border-[var(--border-subtle)] px-[10px] py-[3px] rounded-lg">
      <span class="mr-[5px] opacity-60 text-[11px]">难度</span>
      <span v-for="i in 5" :key="i" class="inline-block w-[12px] h-[12px] mx-[1px] rounded-[3px] transition-colors duration-200" :class="i <= page.frontmatter.difficulty ? 'bg-[#c9963b]' : 'bg-[#e2e8f0] dark:bg-[#2a2e3e]'"></span>
    </span>
    <!-- 推荐度 -->
    <span v-if="page.frontmatter.rating" class="inline-flex items-center text-[11px] text-[#5a5a72] dark:text-[#9494a8] bg-[var(--surface-muted)] border border-[var(--border-subtle)] px-[10px] py-[3px] rounded-lg">
      <span class="mr-[5px] opacity-60 text-[11px]">推荐</span>
      <span v-for="i in 5" :key="i" class="inline-block w-[12px] h-[12px] mx-[1px] rounded-[3px] transition-colors duration-200" :class="i <= page.frontmatter.rating ? 'bg-[#1a5c3a] dark:bg-[#4eca8a]' : 'bg-[#e2e8f0] dark:bg-[#2a2e3e]'"></span>
    </span>
    <!-- PDF 链接 -->
    <a v-if="paper.pdf" :href="paper.pdf" target="_blank" class="inline-flex items-center text-[12px] text-[#c0392b] dark:text-[#e57373] bg-[rgba(192,57,43,0.05)] dark:bg-[rgba(229,115,115,0.08)] border border-[rgba(192,57,43,0.12)] dark:border-[rgba(229,115,115,0.12)] px-[10px] py-[3px] rounded-lg hover:bg-[#c0392b] hover:text-[#fff] hover:border-[#c0392b] transition-all duration-200 font-[500]">
      <Icon icon="FilePdfOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[3px]" /> PDF
    </a>
    <!-- 代码链接 -->
    <a v-if="paper.code" :href="paper.code" target="_blank" class="inline-flex items-center text-[12px] text-[#475569] dark:text-[#94a3b8] bg-[var(--surface-muted)] border border-[var(--border-subtle)] px-[10px] py-[3px] rounded-lg hover:bg-[#1e293b] hover:text-[#fff] hover:border-[#1e293b] dark:hover:bg-[#94a3b8] dark:hover:text-[#0f1117] transition-all duration-200 font-[500]">
      <Icon icon="GithubOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[3px]" /> Code
    </a>
    <!-- 浏览量 -->
    <span class="inline-flex items-center text-[12px] text-[#9494a8]">
      <Icon icon="FireOutlined" :iconSize="isMobile ? 11 : 13" class="opacity-40">
        <span class="waline-pageview-count" :data-path="pagePath" :style="isMobile ? { fontSize: '10px' } : { 'padding-left': '4px' }"></span>
      </Icon>
    </span>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { computed } from 'vue'
import { withBase } from '@vuepress/client'
import { isMobile } from '../../utils'
dayjs.extend(utc)
dayjs.extend(timezone)

interface PaperInfo {
  title?: string;
  authors?: string;
  venue?: string;
  year?: number;
  pdf?: string;
  code?: string;
}

const props = defineProps<{
  page: Record<string, any>
}>()

const pagePath = computed(() => withBase(props.page.path))
const paper = computed<PaperInfo>(() => props.page.frontmatter.paper || {})
const venueText = computed(() => {
  const p = paper.value
  if (p.venue && p.year) return `${p.venue} ${p.year}`
  if (p.venue) return p.venue
  if (p.year) return `${p.year}`
  return ''
})

const formatDateValue = (value: string) => {
  return value ? dayjs.tz(value, 'Asia/Shanghai').format('YYYY-MM-DD') : ''
}
</script>
