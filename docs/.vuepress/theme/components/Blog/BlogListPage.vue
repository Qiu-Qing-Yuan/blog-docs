<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="pt-[20px] w-full sm:w-[var(--content-width)] my-0 mx-auto">
          <div class="flex items-center gap-[8px] mb-[16px] ml-[10px]">
            <Icon :icon="icon" :iconSize="22" />
            <span class="text-[1.2rem] font-[600] bg-gradient-to-r from-[#3eaf7c] to-[#2d8cf0] bg-clip-text text-transparent">{{ title }}</span>
          </div>
          <div class="w-full flex flex-wrap my-[12px] gap-[8px]">
            <RouterLink v-for="({ items, path }, name) in blogMap.map" :key="name" :to="path" class="flex items-center text-[#666] font-normal px-[14px] h-[36px] bg-[#f8f9fa] hover:bg-[#3eaf7c] hover:text-[#fff] dark:bg-[#2a2a3a] dark:hover:bg-[#3eaf7c] dark:text-[#ddd] rounded-full transition-all duration-200 hover:shadow-md hover:scale-105">
              <span class="text-[13px]">{{ name }}</span>
              <span class="ml-[8px] w-[1.2rem] h-[1.2rem] leading-[1.2rem] text-center text-[.7rem] text-[#fff] rounded-full" :style="{ 'background-color': getRandomColor() }"> {{ items.length }}</span>
            </RouterLink>
          </div>
          <BlogItem v-for="(item, index) in paginatedData" :page="item.info" :position="index % 2 == 0 ? 'left' : 'right'" :key="index" />
          <Pagination :pageTotal="pages.pageTotal" :pageNumber="pages.pageNumber" :pageSize="pages.pageSize" @click="onPageChange"> </Pagination>
        </div>
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogCategory } from 'vuepress-plugin-blog2/lib/client'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import BlogItem from './BlogItem.vue'
import { useRandomColor } from '../../utils/useColor'
import { usePagination } from '../../composables'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  type: 'category' | 'tag'
  title: string
  icon: string
  defaultPath: string
}>()

const getRandomColor = useRandomColor
const blogMap = useBlogCategory(props.type)
const route = useRoute()
const router = useRouter()

const { pages, paginatedData, onPageChange } = usePagination({
  dataSource: () => blogMap.value.currentItems || [],
  defaultPageSize: 10
})

watch(
  route,
  (newVal) => {
    if (newVal.path == props.defaultPath) {
      const key = Object.keys(blogMap.value.map)[0]
      router.push(blogMap.value.map[key])
    }
  },
  { immediate: true }
)
</script>
<style scoped>
.router-link-exact-active {
  background: #3eaf7c !important;
  color: #fff !important;
  box-shadow: 0 4px 12px rgba(62, 175, 124, 0.3);
}
</style>
