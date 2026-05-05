<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="pt-[20px] w-full sm:w-[var(--content-width)] my-0 mx-auto">
          <div class="flex items-center gap-[8px] mb-[16px] ml-[10px]">
            <Icon :icon="icon" :iconSize="22" class="text-[#2c7a5a]" />
            <span class="text-[1.2rem] font-[700] tracking-tight text-[#1e293b] dark:text-[#e2e8f0]">{{ title }}</span>
          </div>
          <div class="w-full flex flex-wrap my-[12px] gap-[6px]">
            <RouterLink v-for="({ items, path }, name) in blogMap.map" :key="name" :to="path" class="flex items-center text-[#64748b] dark:text-[#94a3b8] font-normal px-[14px] h-[34px] bg-[#f8fafb] hover:bg-[#2c7a5a] hover:text-[#fff] dark:bg-[#1a1e2e] dark:hover:bg-[#2c7a5a] rounded-full transition-all duration-250 hover:shadow-md border border-[#e2e8f0]/40 dark:border-[rgba(255,255,255,0.04)] hover:border-[#2c7a5a]/20">
              <span class="text-[13px]">{{ name }}</span>
              <span class="ml-[8px] min-w-[1.2rem] h-[1.2rem] leading-[1.2rem] text-center text-[10px] text-[#fff] rounded-full px-[4px] font-[600]" style="background: linear-gradient(135deg, #2c7a5a, #3eaf7c)"> {{ items.length }}</span>
            </RouterLink>
          </div>
          <BlogItem v-for="(item, index) in paginatedData" :page="item.info" :position="index % 2 == 0 ? 'left' : 'right'" :key="index" />
          <Pagination :pageTotal="pages.pageTotal" :pageSize="pages.pageSize" @click="onPageChange"> </Pagination>
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
  background: linear-gradient(135deg, #2c7a5a, #3eaf7c) !important;
  color: #fff !important;
  border-color: transparent !important;
  box-shadow: 0 2px 12px rgba(44, 122, 90, 0.25);
}
</style>
