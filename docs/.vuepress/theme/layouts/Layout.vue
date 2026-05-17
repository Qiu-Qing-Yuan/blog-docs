<template>
  <!-- 首页导航栏：滚动到文章区才显示 -->
  <nav v-if="isHome" class="home-navbar" :class="{ 'navbar-visible': showNavbar }">
    <div class="home-navbar-inner">
      <router-link to="/" class="home-navbar-brand">沉潜</router-link>
      <div class="home-navbar-links">
        <router-link v-for="item in navbarItems" :key="item.link" :to="item.link" class="home-navbar-link" active-class="home-navbar-link--active">
          <Icon v-if="item.icon" :icon="item.icon" :iconSize="14" />
          <span>{{ item.text }}</span>
        </router-link>
        <button class="home-navbar-toggle" @click="toggleDark" :title="isDark ? '浅色模式' : '深色模式'">
          <Icon :icon="isDark ? 'SunOutlined' : 'MoonOutlined'" :iconSize="15" />
        </button>
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
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { useDarkMode } from '@vuepress/theme-default/lib/client/composables'
import { isMobile } from '../utils'
import { computed, ref, onMounted, onUnmounted } from 'vue'
const page = usePageData()
const isDark = useDarkMode()

const toggleDark = () => {
  const html = document.documentElement
  html.classList.toggle('dark')
}
const frontmatter = usePageFrontmatter()
const isHome = computed(() => frontmatter.value.home === true)

// 首页导航栏配置
const navbarItems = [
  { text: '首页', link: '/', icon: 'HomeOutlined' },
  { text: '研究领域', link: '/category/', icon: 'AppstoreOutlined' },
  { text: '标签', link: '/tag/', icon: 'TagsOutlined' },
  { text: '时间轴', link: '/timeline/', icon: 'ClockCircleTwotone' },
]

// 滚动显示导航栏
const showNavbar = ref(false)
let navbarScrollHandler: (() => void) | null = null

onMounted(() => {
  if (isHome.value) {
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
  background: rgba(250, 249, 247, 0.88);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
}

.home-navbar.navbar-visible {
  transform: translateY(0);
  opacity: 1;
}

.home-navbar-inner {
  max-width: var(--container-main, 1200px);
  margin: 0 auto;
  padding: 0 28px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-navbar-brand {
  font-family: var(--font-serif, 'Playfair Display', 'Noto Serif SC', Georgia, serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
  text-decoration: none;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.home-navbar-links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.home-navbar-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  font-family: var(--font-sans, 'Source Sans 3', 'Noto Sans SC', sans-serif);
  font-size: 13.5px;
  font-weight: 500;
  color: #5a5a72;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
  position: relative;
}

.home-navbar-link:hover {
  color: #1a5c3a;
  background: rgba(26, 92, 58, 0.06);
}

.home-navbar-link--active {
  color: #1a5c3a;
  font-weight: 600;
}

.home-navbar-link--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: #1a5c3a;
  border-radius: 1px;
}

/* ── 暗色模式 ── */
:global(.dark) .home-navbar {
  background: rgba(14, 16, 25, 0.88);
  border-bottom-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
}

:global(.dark) .home-navbar-brand {
  color: #e2e0da;
}

:global(.dark) .home-navbar-link {
  color: #9494a8;
}

:global(.dark) .home-navbar-link:hover {
  color: #4eca8a;
  background: rgba(78, 202, 138, 0.08);
}

:global(.dark) .home-navbar-link--active {
  color: #4eca8a;
}

:global(.dark) .home-navbar-link--active::after {
  background: #4eca8a;
}

.home-navbar-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  background: transparent;
  color: #5a5a72;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-left: 4px;
}

.home-navbar-toggle:hover {
  color: #1a5c3a;
  background: rgba(26, 92, 58, 0.06);
}

:global(.dark) .home-navbar-toggle {
  color: #9494a8;
}

:global(.dark) .home-navbar-toggle:hover {
  color: #4eca8a;
  background: rgba(78, 202, 138, 0.08);
}

@media (max-width: 768px) {
  .home-navbar-inner {
    padding: 0 16px;
  }

  .home-navbar-links {
    gap: 0;
  }

  .home-navbar-link {
    padding: 6px 10px;
    font-size: 12.5px;
    gap: 4px;
  }

  .home-navbar-link :deep(.icon) {
    display: none;
  }
}
</style>
