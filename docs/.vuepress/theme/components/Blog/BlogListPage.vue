<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="pt-[20px] w-full sm:w-[var(--content-width)] my-0 mx-auto">
          <Icon :icon="icon" :iconSize="25" :text="title" :textSize="20" class="dark:hover:text-[#fff] ml-[10px]" />
          <div class="w-full flex flex-wrap my-[10px]">
            <RouterLink v-for="({ items, path }, name) in blogMap.map" :key="name" :to="path" class="shadow-item flex items-center text-[#666] font-normal px-[8px] h-[35px] mt-[5px] sm:px-[14px] sm:h-[50px] hover:bg-[#3eaf7c] hover:text-[#fff] dark:bg-[#181818] dark:hover:bg-[#3eaf7c] dark:text-[#fff] rounded mx-[5px]">
              <span class="text-[10px] sm:text-[1rem]">{{ name }}</span>
              <span class="ml-[10px] w-[1.2rem] h-[1.2rem] leading-[1.2rem] text-center text-[.7rem] text-[#fff]" :style="{ 'background-color': getRandomColor() }"> {{ items.length }}</span>
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
  background: #3eaf7c;
}
</style>
