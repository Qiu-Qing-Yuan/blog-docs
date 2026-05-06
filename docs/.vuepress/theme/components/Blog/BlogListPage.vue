<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="pt-[20px] w-full sm:w-[var(--content-width)] my-0 mx-auto">
          <div class="flex items-center gap-[8px] mb-[16px] ml-[10px]">
            <Icon :icon="icon" :iconSize="22" class="text-[#1a5c3a] dark:text-[#4eca8a]" />
            <span class="text-[1.2rem] font-serif font-[700] tracking-tight text-[#1a1a2e] dark:text-[#e2e0da]">{{ title }}</span>
          </div>
          <div class="w-full flex flex-wrap my-[12px] gap-[6px]">
            <RouterLink v-for="({ items, path }, name, idx) in blogMap.map" :key="name" :to="path" class="flex items-center text-[#5a5a72] dark:text-[#9494a8] font-normal px-[14px] h-[34px] bg-[var(--surface-muted)] hover:bg-[#1a5c3a] hover:text-[#fff] dark:hover:bg-[#1a5c3a] rounded-full transition-all duration-250 hover:shadow-md border border-[var(--border-subtle)] hover:border-[#1a5c3a]/20">
              <span class="text-[13px]">{{ name }}</span>
              <span class="ml-[8px] min-w-[1.2rem] h-[1.2rem] leading-[1.2rem] text-center text-[10px] text-[#fff] rounded-full px-[4px] font-[600]" :style="{ background: badgeGradients[idx % badgeGradients.length] }"> {{ items.length }}</span>
            </RouterLink>
          </div>
          <BlogItem v-for="(item, index) in paginatedData" :page="item.info" :position="index % 2 == 0 ? 'left' : 'right'" :key="index" />
          <Pagination :pageTotal="pages.pageTotal" :pageSize="pages.pageSize" @click="onPageChange" />
        </div>
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogCategory } from 'vuepress-plugin-blog2/lib/client'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import BlogItem from './BlogItem.vue'
import { usePagination } from '../../composables'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  type: 'category' | 'tag'
  title: string
  icon: string
  defaultPath: string
}>()

const blogMap = useBlogCategory(props.type)
const route = useRoute()
const router = useRouter()

const badgeGradients = [
  'linear-gradient(135deg, #c0392b, #e74c3c)',
  'linear-gradient(135deg, #2980b9, #3498db)',
  'linear-gradient(135deg, #1a5c3a, #2ecc71)',
  'linear-gradient(135deg, #d4a017, #f0c040)',
  'linear-gradient(135deg, #8e44ad, #9b59b6)',
  'linear-gradient(135deg, #e67e22, #f39c12)',
  'linear-gradient(135deg, #16a085, #1abc9c)',
  'linear-gradient(135deg, #2c3e50, #34495e)',
  'linear-gradient(135deg, #c0392b, #d4a017)',
  'linear-gradient(135deg, #2980b9, #16a085)',
]

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
  background: linear-gradient(135deg, #1a5c3a, #2ecc71) !important;
  color: #fff !important;
  border-color: transparent !important;
  box-shadow: 0 2px 12px rgba(26, 92, 58, 0.25);
}
</style>
