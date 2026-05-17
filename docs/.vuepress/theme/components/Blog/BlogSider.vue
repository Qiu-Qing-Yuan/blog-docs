<template>
  <div class="w-full pb-[32px] rounded-[16px] px-[16px] bg-[#fff] dark:bg-[#161822] shadow-sidebar border-box sticky top-[70px] overflow-hidden border border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]">
    <!-- 作者信息 -->
    <div class="relative w-full flex flex-wrap items-center justify-center pt-[1.8rem] pb-[1.3rem] mb-[2px]">
      <div class="absolute inset-0 bg-gradient-to-br from-[#1a5c3a]/4 to-[#2d8cf0]/4 dark:from-[#1a5c3a]/3 dark:to-[#2d8cf0]/3 rounded-t-[16px]"></div>
      <img class="relative rounded-[14px] h-[4.2rem] w-[4.2rem] mt-[0.4rem] mb-[0.6rem] inline-block ring-1 ring-[#1a5c3a]/10 ring-offset-2 ring-offset-white dark:ring-offset-[#161822] transition-transform duration-400 hover:scale-105 shadow-md" v-if="themeData.authorAvatar" :src="withBase(themeData.authorAvatar)" alt="author-avatar" />
      <h3 class="relative block w-full text-center m-0 font-[700] text-[1.05rem] tracking-tight text-[#1a1a2e] dark:text-[#e2e0da]" v-if="themeData.author">{{ themeData.author }}</h3>
    </div>

    <!-- 统计数据 -->
    <div class="w-[92%] flex flex-wrap items-center justify-center my-[12px] mx-auto bg-[var(--surface-muted)] rounded-[12px] py-[14px] border border-[var(--border-subtle)]">
      <div class="text-center flex-[0_0_33%]">
        <h3 class="m-0 text-[#1a5c3a] dark:text-[#4eca8a] font-[700] text-[1.3rem] tabular-nums font-mono">{{ post.items.length }}</h3>
        <h6 class="m-0 font-normal mt-[3px] text-[11px] text-[#9494a8] tracking-wider uppercase">论文</h6>
      </div>
      <div class="text-center flex-[0_0_33%] border-x border-[var(--border-subtle)]">
        <h3 class="m-0 text-[#2d8cf0] font-[700] text-[1.3rem] tabular-nums font-mono">{{ Object.keys(category.map).length }}</h3>
        <h6 class="m-0 font-normal mt-[3px] text-[11px] text-[#9494a8] tracking-wider uppercase">领域</h6>
      </div>
      <div class="text-center flex-[0_0_33%]">
        <h3 class="m-0 text-[#c9963b] font-[700] text-[1.3rem] tabular-nums font-mono">{{ Object.keys(tag.map).length }}</h3>
        <h6 class="m-0 font-normal mt-[3px] text-[11px] text-[#9494a8] tracking-wider uppercase">标签</h6>
      </div>
    </div>

    <!-- 个人摘要 -->
    <div v-if="frontmatter.summary" class="leading-[26px] border-solid border-l-[3px] border-l-[#1a5c3a] dark:border-l-[#4eca8a] border-y-0 border-r-0 bg-[var(--surface-muted)] pl-[14px] my-[14px] text-[13px] rounded-r-[8px] py-[10px] text-[#5a5a72] dark:text-[#9494a8] font-serif italic">{{ frontmatter.summary }}</div>

    <!-- 研究方向 -->
    <div v-if="frontmatter.hobby" class="mt-[14px]">
      <Icon icon="ExperimentOutlined" text="研究方向" :textSize="13" class="font-[600] text-[#475569] dark:text-[#9494a8] tracking-wide"></Icon>
      <div class="mt-[10px] flex flex-wrap gap-[6px]">
        <span v-for="(item, index) in frontmatter.hobby" :key="index" class="px-[12px] py-[5px] rounded-full inline-block text-[12px] text-[#fff] transition-all duration-250 hover:scale-105 hover:shadow-md font-[500]" :style="{ background: hobbyGradients[index % hobbyGradients.length] }">{{ item }}</span>
      </div>
    </div>

    <!-- 学术资源 -->
    <div v-if="themeData.socialLinks" class="mt-[16px]">
      <Icon icon="FolderOpenOutlined" text="学术资源" :textSize="13" class="font-[600] text-[#475569] dark:text-[#9494a8] tracking-wide"></Icon>
      <div class="pt-[10px] flex justify-center gap-[14px]">
        <span v-for="(item, index) in themeData.socialLinks" :key="index">
          <client-only>
            <Icon :icon="item.icon" :link="item.link" target="_blank" :iconSize="22" :iconColor="socialColors[index % socialColors.length]" class="transition-transform duration-250 hover:scale-125"></Icon>
          </client-only>
        </span>
      </div>
    </div>

    <!-- 访客地图 -->
    <ClustrMaps />

    <!-- 分隔线 -->
    <div class="my-[18px] flex items-center gap-[10px]">
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent"></div>
    </div>

    <!-- 研究领域 -->
    <div class="w-full flex my-[10px] flex-wrap">
      <div class="w-full mb-[10px]">
        <Icon icon="AppstoreTwotone" text="研究领域" :textSize="13" class="font-[600] text-[#475569] dark:text-[#9494a8] tracking-wide" />
      </div>
      <RouterLink
        v-for="({ items, path }, name, idx) in category.map"
        :key="name"
        :to="path"
        class="w-full flex items-center justify-between text-[#5a5a72] dark:text-[#9494a8] px-[14px] my-[3px] font-normal h-[36px] bg-[var(--surface-muted)] hover:bg-[#1a5c3a] hover:text-[#fff] dark:hover:bg-[#1a5c3a] rounded-[10px] transition-all duration-250 border border-transparent hover:border-[#1a5c3a]/20"
      >
        <span class="text-[13px]">{{ name }}</span>
        <span class="ml-[10px] min-w-[1.3rem] h-[1.3rem] leading-[1.3rem] text-center text-[10px] text-[#fff] rounded-[6px] px-[5px] font-[600]" :style="{ background: categoryGradients[idx % categoryGradients.length] }"> {{ items.length }}</span>
      </RouterLink>
    </div>

    <!-- 标签 -->
    <div class="w-full flex my-[10px] flex-wrap">
      <div class="w-full mb-[10px]">
        <Icon icon="TagsOutlined" text="标签列表" :textSize="13" class="font-[600] text-[#475569] dark:text-[#9494a8] tracking-wide" />
      </div>
      <RouterLink v-for="({ items, path }, name, idx) in tag.map" :key="name" :to="path" class="flex items-center text-[#5a5a72] dark:text-[#9494a8] px-[10px] my-[3px] font-normal h-[26px] bg-[var(--surface-muted)] hover:bg-[#1a5c3a] hover:text-[#fff] dark:hover:bg-[#1a5c3a] rounded-full mx-[2px] transition-all duration-250 border border-[var(--border-subtle)] hover:border-[#1a5c3a]/20">
        <span class="text-[11px]">{{ name }}</span>
        <span class="ml-[4px] min-w-[1rem] h-[1rem] leading-[1rem] text-center text-[9px] text-[#fff] rounded-full px-[3px] font-[600]" :style="{ background: tagGradients[idx % tagGradients.length] }"> {{ items.length }}</span>
      </RouterLink>
    </div>

    <!-- 学术工具 -->
    <div class="w-full flex my-[10px] flex-wrap">
      <div class="w-full mb-[10px]">
        <Icon icon="LinkOutlined" text="学术工具" :textSize="13" class="font-[600] text-[#475569] dark:text-[#9494a8] tracking-wide" />
      </div>
      <span class="mt-[4px] bg-[var(--surface-muted)] rounded-[10px] transition-all duration-250 hover:shadow-md w-full border border-[var(--border-subtle)] hover:border-[#1a5c3a]/20" v-for="(item, index) in themeData.friendLink" :key="index">
        <a :href="item.link" target="_blank" class="flex items-center text-[#1a5c3a] dark:text-[#4eca8a] py-[8px] px-[14px] text-[13px] font-[500]">
          <span>{{ item.title }}</span>
        </a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'
import { usePageFrontmatter, withBase } from '@vuepress/client'
import { useBlogCategory, useBlogType } from 'vuepress-plugin-blog2/lib/client'
import SiteStats from './SiteStats.vue'
import ClustrMaps from './ClustrMaps.vue'
interface ThemeData {
  author?: string;
  authorAvatar?: string;
  socialLinks?: Array<{ icon: string; link: string }>;
  friendLink?: Array<{ title: string; link: string }>;
  [key: string]: any;
}

const themeData = useThemeData() as unknown as ThemeData
const frontmatter = usePageFrontmatter()
const category = useBlogCategory('category')
const tag = useBlogCategory('tag')
const post = useBlogType('article')

const hobbyGradients = [
  'linear-gradient(135deg, #c0392b, #e74c3c)',
  'linear-gradient(135deg, #d4a017, #f0c040)',
  'linear-gradient(135deg, #1a5c3a, #2ecc71)',
  'linear-gradient(135deg, #e67e22, #f39c12)',
  'linear-gradient(135deg, #2980b9, #3498db)',
  'linear-gradient(135deg, #8e44ad, #9b59b6)',
  'linear-gradient(135deg, #16a085, #1abc9c)',
  'linear-gradient(135deg, #2c3e50, #34495e)',
]

const socialColors = ['#c0392b', '#e67e22', '#d4a017', '#1a5c3a', '#2980b9', '#8e44ad', '#16a085', '#2c3e50']

const categoryGradients = [
  'linear-gradient(135deg, #1a5c3a, #2ecc71)',
  'linear-gradient(135deg, #2980b9, #3498db)',
  'linear-gradient(135deg, #c0392b, #e74c3c)',
  'linear-gradient(135deg, #d4a017, #f0c040)',
  'linear-gradient(135deg, #8e44ad, #9b59b6)',
  'linear-gradient(135deg, #16a085, #1abc9c)',
  'linear-gradient(135deg, #e67e22, #f39c12)',
  'linear-gradient(135deg, #2c3e50, #34495e)',
]

const tagGradients = [
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
  'linear-gradient(135deg, #8e44ad, #c0392b)',
  'linear-gradient(135deg, #1a5c3a, #2980b9)',
]
</script>
