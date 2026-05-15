<template>
  <!-- 首页加载动画 -->
  <client-only v-if="isHome && showHomeLoading">
    <LoadingPage />
  </client-only>
  <!-- 首页导航栏：滚动到文章区才显示 -->
  <nav v-if="isHome" class="home-navbar" :class="{ 'navbar-visible': showNavbar }">
    <div class="home-navbar-inner">
      <a href="/blog-docs/" class="home-navbar-brand">沉潜</a>
      <div class="home-navbar-links">
        <a v-for="item in navbarItems" :key="item.link" :href="item.link" class="home-navbar-link">
          <span v-if="item.icon"><Icon :icon="item.icon" :iconSize="14" /></span>
          <span>{{ item.text }}</span>
        </a>
      </div>
    </div>
  </nav>
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
import { computed, ref, onMounted, onUnmounted } from 'vue'
const page = usePageData()
const isDark = useDarkMode()
const frontmatter = usePageFrontmatter()
const isHome = computed(() => frontmatter.value.home === true)

// 首页导航栏配置
const navbarItems = [
  { text: '首页', link: '/', icon: 'HomeOutlined' },
  { text: '研究领域', link: '/blog-docs/category/', icon: 'AppstoreOutlined' },
  { text: '标签', link: '/blog-docs/tag/', icon: 'TagsOutlined' },
  { text: '时间轴', link: '/blog-docs/timeline/', icon: 'ClockCircleTwotone' },
]

// 滚动显示导航栏
const showNavbar = ref(false)
let navbarScrollHandler: (() => void) | null = null

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

    // 监听滚动，到文章区显示导航栏
    navbarScrollHandler = () => {
      const articlesEl = document.getElementById('articles')
      if (articlesEl) {
        showNavbar.value = window.scrollY >= articlesEl.offsetTop - 60
      }
    }
    window.addEventListener('scroll', navbarScrollHandler, { passive: true })
  }
})

onUnmounted(() => {
  if (navbarScrollHandler) {
    window.removeEventListener('scroll', navbarScrollHandler)
  }
})
</script>

<style scoped>
.home-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.home-navbar.navbar-visible {
  transform: translateY(0);
  opacity: 1;
}

.home-navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-navbar-brand {
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.home-navbar-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.home-navbar-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: #5a5a72;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.home-navbar-link:hover {
  color: #1a5c3a;
  background: rgba(26, 92, 58, 0.06);
}

@media (max-width: 768px) {
  .home-navbar-inner {
    padding: 0 16px;
  }

  .home-navbar-links {
    gap: 2px;
  }

  .home-navbar-link {
    padding: 6px 8px;
    font-size: 12px;
  }

  .home-navbar-link span:first-child {
    display: none;
  }
}
</style>
