<template>
  <div class="mx-[5px] mt-[10px] flex sm:w-[1120px] sm:mx-auto">
    <div class="w-full sm:flex-1">
      <BlogItem class="border" v-for="(item, index) in paginatedData" :key="index" :page="item.info" :position="index % 2 == 0 ? 'left' : 'right'" :class="index % 3 == 0 ? 'draw' : index % 3 == 1 ? 'draw meet' : 'center'"></BlogItem>
      <Pagination :pageTotal="pages.pageTotal" :pageSize="pages.pageSize" @click="onPageChange"> </Pagination>
    </div>
    <div class="sm:w-[300px] ml-[15px]" v-if="!isMobile">
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

//触发首页浏览量统计
useCount(false)
</script>
