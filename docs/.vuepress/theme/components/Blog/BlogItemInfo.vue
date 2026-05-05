<template>
  <div class="w-full items-center mt-[5px] sm:mt-[15px] sm:flex sm:h-9 flex-wrap gap-y-1">
    <!-- 论文作者 -->
    <Icon icon="UserOutlined" :text="paper.authors" :iconSize="isMobile ? 12 : 16" :textSize="isMobile ? 10 : 13" class="text-[#7F7F7F] mr-[5px] sm:mr-[1rem]" v-if="paper.authors"></Icon>
    <!-- 会议/期刊 · 年份 -->
    <Icon icon="ReadOutlined" :text="venueText" :iconSize="isMobile ? 12 : 16" :textSize="isMobile ? 10 : 13" class="text-[#7F7F7F] mr-[5px] sm:mr-[1rem]" v-if="venueText"></Icon>
    <!-- 发布日期 -->
    <Icon icon="FieldTimeOutlined" :text="formatDateValue(page.frontmatter.date)" :iconSize="isMobile ? 12 : 16" :textSize="isMobile ? 10 : 13" v-if="formatDateValue(page.frontmatter.date)" class="text-[#7F7F7F] mr-[5px] sm:mr-[1rem]"> </Icon>
    <!-- 分类 -->
    <Icon icon="AppstoreOutlined" :text="page.frontmatter.category" :iconSize="isMobile ? 12 : 16" :textSize="isMobile ? 10 : 13" type="category" class="text-[#7F7F7F] mr-[5px] sm:mr-[1rem] z-[300]" v-if="page.frontmatter.category"></Icon>
    <!-- 标签 -->
    <Icon icon="TagsOutlined" :text="page.frontmatter.tag" :iconSize="isMobile ? 12 : 16" :textSize="isMobile ? 10 : 13" type="tag" class="text-[#7F7F7F] mr-[5px] sm:mr-[1rem] z-[300]" v-if="page.frontmatter.tag"></Icon>
    <!-- 难度 -->
    <span v-if="page.frontmatter.difficulty" class="inline-flex items-center mr-[5px] sm:mr-[1rem] text-[12px] text-[#7F7F7F]">
      <span class="mr-[4px]">难度</span>
      <span v-for="i in 5" :key="i" class="text-[12px]" :class="i <= page.frontmatter.difficulty ? 'text-[#f5a623]' : 'text-[#ddd]'">&#9733;</span>
    </span>
    <!-- 推荐度 -->
    <span v-if="page.frontmatter.rating" class="inline-flex items-center mr-[5px] sm:mr-[1rem] text-[12px] text-[#7F7F7F]">
      <span class="mr-[4px]">推荐</span>
      <span v-for="i in 5" :key="i" class="text-[12px]" :class="i <= page.frontmatter.rating ? 'text-[#3eaf7c]' : 'text-[#ddd]'">&#9733;</span>
    </span>
    <!-- PDF 链接 -->
    <a v-if="paper.pdf" :href="paper.pdf" target="_blank" class="inline-flex items-center mr-[5px] sm:mr-[1rem] text-[12px] text-[#7F7F7F] hover:text-[#3eaf7c] transition-colors">
      <Icon icon="FilePdfOutlined" :iconSize="isMobile ? 12 : 16" class="mr-[2px]" /> PDF
    </a>
    <!-- 代码链接 -->
    <a v-if="paper.code" :href="paper.code" target="_blank" class="inline-flex items-center mr-[5px] sm:mr-[1rem] text-[12px] text-[#7F7F7F] hover:text-[#3eaf7c] transition-colors">
      <Icon icon="GithubOutlined" :iconSize="isMobile ? 12 : 16" class="mr-[2px]" /> Code
    </a>
    <!-- 浏览量-->
    <Icon icon="FireOutlined" class="text-[#7F7F7F] sm:mr-[1rem]" :iconSize="isMobile ? 12 : 16" :textSize="isMobile ? 10 : 13">
      <span class="waline-pageview-count" :data-path="page.path" :style="isMobile ? { fontSize: '10px' } : { 'padding-left': '5px' }"></span>
    </Icon>
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
