<template>
  <!-- 首页加载动画 -->
  <client-only v-if="isHome && showHomeLoading">
    <LoadingPage />
  </client-only>
  <!-- 首页：直接渲染 HomeHero + HomeBlog，绕过默认主题的 Home.vue -->
  <HomeHero v-if="isHome" />
  <div id="articles" v-if="isHome">
    <HomeBlog />
  </div>
  <HomeFooter v-if="isHome" />
  <!-- 非首页：正常布局 -->
  <ParentLayout v-if="!isHome">
    <template #page-top>
      <div class="title sm:w-[var(--content-width)] my-0 mx-auto py-0 px-6 rounded-[16px]">
        <!-- 返回按钮 -->
        <div class="flex items-center justify-between mb-[4px]">
          <h1 class="text-[1.3rem] sm:text-[1.8rem] font-[700] tracking-tight text-[#1e293b] dark:text-[#e2e8f0]">{{ page.title }}</h1>
          <Icon icon="RollbackOutlined" @click="$router.go(-1)" class="cursor-pointer text-[#94a3b8] hover:text-[#2c7a5a] transition-colors duration-200">
            <span v-if="!isMobile" class="text-[13px]">返回</span>
          </Icon>
        </div>
        <!-- 论文元信息 -->
        <BlogItemInfo :page="page" class="pb-3 mt-0"></BlogItemInfo>
        <!-- 渐变分隔线 -->
        <div class="h-px bg-gradient-to-r from-[#2c7a5a]/20 via-[#2d8cf0]/15 to-transparent mb-[4px]"></div>
      </div>
    </template>
    <template #page-bottom>
      <ArticleStats :page="page" />
      <CommentService :darkmode="isDark" />
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import HomeHero from '../components/HomeHero.vue'
import HomeBlog from '../components/HomeBlog.vue'
import HomeFooter from '@theme/HomeFooter.vue'
import BlogItemInfo from '../components/Blog/BlogItemInfo.vue'
import ArticleStats from '../components/Blog/ArticleStats.vue'
import LoadingPage from '../components/global/Loading.vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { useDarkMode } from '@vuepress/theme-default/lib/client/composables'
import { isMobile } from '../utils'
import { computed, ref, onMounted } from 'vue'
const page = usePageData()
const isDark = useDarkMode()
const frontmatter = usePageFrontmatter()
const isHome = computed(() => frontmatter.value.home === true)

// 首次访问加载动画（与原 Home.vue 行为一致）
const showHomeLoading = ref(true)
onMounted(() => {
  if (isHome.value) {
    const firstLoad = !sessionStorage.getItem('firstLoad')
    if (firstLoad) {
      setTimeout(() => {
        showHomeLoading.value = false
        sessionStorage.setItem('firstLoad', 'false')
      }, 1000)
    } else {
      showHomeLoading.value = false
    }
  }
})
</script>
