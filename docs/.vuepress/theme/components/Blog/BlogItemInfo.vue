<template>
  <div class="w-full items-center mt-[8px] sm:mt-[14px] sm:flex sm:h-8 flex-wrap gap-y-1 gap-x-1">
    <!-- 论文作者 -->
    <span v-if="paper.authors" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[12px] text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e2233] px-[8px] py-[2px] rounded-md">
      <Icon icon="UserOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[3px] opacity-60" />{{ paper.authors }}
    </span>
    <!-- 会议/期刊 · 年份 -->
    <span v-if="venueText" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[12px] text-[#2d8cf0] bg-[#eff6ff] dark:bg-[#1a2332] px-[8px] py-[2px] rounded-md font-[500]">
      <Icon icon="ReadOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[3px] opacity-70" />{{ venueText }}
    </span>
    <!-- 发布日期 -->
    <span v-if="formatDateValue(page.frontmatter.date)" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[12px] text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e2233] px-[8px] py-[2px] rounded-md">
      <Icon icon="FieldTimeOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[3px] opacity-60" />{{ formatDateValue(page.frontmatter.date) }}
    </span>
    <!-- 分类 -->
    <span v-if="page.frontmatter.category" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[12px] z-[300]">
      <Icon icon="AppstoreOutlined" :text="page.frontmatter.category" :iconSize="isMobile ? 11 : 13" :textSize="12" type="category" class="text-[#94a3b8]"></Icon>
    </span>
    <!-- 标签 -->
    <span v-if="page.frontmatter.tag" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[12px] z-[300]">
      <Icon icon="TagsOutlined" :text="page.frontmatter.tag" :iconSize="isMobile ? 11 : 13" :textSize="12" type="tag" class="text-[#94a3b8]"></Icon>
    </span>
    <!-- 难度 -->
    <span v-if="page.frontmatter.difficulty" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[11px] text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e2233] px-[8px] py-[2px] rounded-md">
      <span class="mr-[3px] opacity-70">难度</span>
      <span v-for="i in 5" :key="i" class="text-[11px]" :class="i <= page.frontmatter.difficulty ? 'text-[#f5a623]' : 'text-[#e2e8f0] dark:text-[#334155]'">&#9733;</span>
    </span>
    <!-- 推荐度 -->
    <span v-if="page.frontmatter.rating" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[11px] text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e2233] px-[8px] py-[2px] rounded-md">
      <span class="mr-[3px] opacity-70">推荐</span>
      <span v-for="i in 5" :key="i" class="text-[11px]" :class="i <= page.frontmatter.rating ? 'text-[#2c7a5a]' : 'text-[#e2e8f0] dark:text-[#334155]'">&#9733;</span>
    </span>
    <!-- PDF 链接 -->
    <a v-if="paper.pdf" :href="paper.pdf" target="_blank" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[12px] text-[#ef4444] bg-[#fef2f2] dark:bg-[#2a1a1a] px-[8px] py-[2px] rounded-md hover:bg-[#ef4444] hover:text-[#fff] transition-all duration-200">
      <Icon icon="FilePdfOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[2px]" /> PDF
    </a>
    <!-- 代码链接 -->
    <a v-if="paper.code" :href="paper.code" target="_blank" class="inline-flex items-center mr-[6px] sm:mr-[10px] text-[12px] text-[#475569] dark:text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e2233] px-[8px] py-[2px] rounded-md hover:bg-[#475569] hover:text-[#fff] dark:hover:bg-[#94a3b8] dark:hover:text-[#0f1117] transition-all duration-200">
      <Icon icon="GithubOutlined" :iconSize="isMobile ? 11 : 13" class="mr-[2px]" /> Code
    </a>
    <!-- 浏览量 -->
    <span class="inline-flex items-center text-[12px] text-[#94a3b8]">
      <Icon icon="FireOutlined" :iconSize="isMobile ? 11 : 13" class="opacity-50">
        <span class="waline-pageview-count" :data-path="page.path" :style="isMobile ? { fontSize: '10px' } : { 'padding-left': '4px' }"></span>
      </Icon>
    </span>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { computed } from 'vue'
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
