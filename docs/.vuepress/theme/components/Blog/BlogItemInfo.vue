<template>
  <div class="w-full items-center mt-[12px] sm:mt-[14px] sm:flex sm:h-8 flex-wrap gap-y-[6px] gap-x-[6px]">
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
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { isMobile } from '../../utils'
dayjs.extend(utc)
dayjs.extend(timezone)

const props = defineProps<{
  page: Record<string, any>
}>()

const formatDateValue = (value: string) => {
  return value ? dayjs.tz(value, 'Asia/Shanghai').format('YYYY-MM-DD') : ''
}
</script>
