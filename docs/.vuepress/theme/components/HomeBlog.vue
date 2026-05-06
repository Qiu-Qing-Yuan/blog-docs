<template>
  <div class="mx-[8px] mt-[16px] flex w-full max-w-[1140px] sm:mx-auto">
    <div class="w-full sm:flex-1 sm:pr-[20px]">
      <BlogItem v-for="(item, index) in paginatedData" :key="index" :page="item.info" :position="index % 2 == 0 ? 'left' : 'right'" class="animate-fade-in" :style="{ animationDelay: `${index * 0.08}s` }"></BlogItem>
      <Pagination :pageTotal="pages.pageTotal" :pageSize="pages.pageSize" @click="onPageChange"> </Pagination>
    </div>
    <div class="sm:w-[300px] ml-[12px]" v-if="!isMobile">
      <BlogSider></BlogSider>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogItem from './Blog/BlogItem.vue'
import BlogSider from './Blog/BlogSider.vue'
import { useBlogType } from 'vuepress-plugin-blog2/lib/client'
import { usePagination, useCount } from '../composables'
import { isMobile } from '../utils'

const articles = useBlogType('article')
const { pages, paginatedData, onPageChange } = usePagination({
  dataSource: () => articles.value.items,
  defaultPageSize: 10
})

useCount(false)
</script>
