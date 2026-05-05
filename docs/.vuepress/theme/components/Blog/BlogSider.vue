<template>
  <div class="w-full pb-[32px] rounded-[16px] px-[16px] dark:bg-[#161822] bg-[#fff] shadow-sidebar border-box sticky top-[70px] overflow-hidden border border-[#e2e8f0]/40 dark:border-[rgba(255,255,255,0.04)]">
    <!-- 作者信息 -->
    <div class="relative w-full flex flex-wrap items-center justify-center pt-[1.8rem] pb-[1.3rem] mb-[2px]">
      <div class="absolute inset-0 bg-gradient-to-br from-[#2c7a5a]/6 to-[#2d8cf0]/6 dark:from-[#2c7a5a]/3 dark:to-[#2d8cf0]/3 rounded-t-[16px]"></div>
      <img class="relative rounded-[14px] h-[4.2rem] w-[4.2rem] mt-[0.4rem] mb-[0.6rem] inline-block ring-1 ring-[#2c7a5a]/15 ring-offset-2 ring-offset-white dark:ring-offset-[#161822] transition-transform duration-400 hover:scale-105 shadow-md" v-if="themeData.authorAvatar" :src="withBase(themeData.authorAvatar)" alt="author-avatar" />
      <h3 class="relative block w-full text-center m-0 font-[700] text-[1.05rem] tracking-tight text-[#1e293b] dark:text-[#e2e8f0]" v-if="themeData.author">{{ themeData.author }}</h3>
    </div>

    <!-- 统计数据 -->
    <div class="w-[92%] flex flex-wrap items-center justify-center my-[12px] mx-auto bg-[#f8fafb] dark:bg-[#1a1e2e] rounded-[12px] py-[14px] border border-[#e2e8f0]/40 dark:border-[rgba(255,255,255,0.04)]">
      <div class="text-center flex-[0_0_33%]">
        <h3 class="m-0 text-[#2c7a5a] font-[700] text-[1.3rem] tabular-nums">{{ post.items.length }}</h3>
        <h6 class="m-0 font-normal mt-[3px] text-[11px] text-[#94a3b8] tracking-wider uppercase">论文</h6>
      </div>
      <div class="text-center flex-[0_0_33%] border-x border-[#e2e8f0]/50 dark:border-[rgba(255,255,255,0.05)]">
        <h3 class="m-0 text-[#2d8cf0] font-[700] text-[1.3rem] tabular-nums">{{ Object.keys(category.map).length }}</h3>
        <h6 class="m-0 font-normal mt-[3px] text-[11px] text-[#94a3b8] tracking-wider uppercase">领域</h6>
      </div>
      <div class="text-center flex-[0_0_33%]">
        <h3 class="m-0 text-[#e6a23c] font-[700] text-[1.3rem] tabular-nums">{{ Object.keys(tag.map).length }}</h3>
        <h6 class="m-0 font-normal mt-[3px] text-[11px] text-[#94a3b8] tracking-wider uppercase">标签</h6>
      </div>
    </div>

    <!-- 个人摘要 -->
    <div v-if="frontmatter.summary" class="leading-[26px] border-solid border-l-[3px] border-l-[#2c7a5a] border-y-0 border-r-0 bg-[#f8fafb] dark:bg-[#1a1e2e] pl-[14px] my-[14px] text-[13px] rounded-r-[8px] py-[10px] text-[#64748b] dark:text-[#94a3b8]">{{ frontmatter.summary }}</div>

    <!-- 研究方向 -->
    <div v-if="frontmatter.hobby" class="mt-[14px]">
      <Icon icon="ExperimentOutlined" text="研究方向" :textSize="13" class="font-[600] text-[#475569] dark:text-[#94a3b8] tracking-wide"></Icon>
      <div class="mt-[10px] flex flex-wrap gap-[6px]">
        <span v-for="(item, index) in frontmatter.hobby" :key="index" class="px-[12px] py-[5px] rounded-full inline-block text-[12px] text-[#fff] transition-all duration-250 hover:scale-105 hover:shadow-md font-[500]" :style="{ background: `linear-gradient(135deg, ${useRandomColor()}, ${useRandomColor()})` }">{{ item }}</span>
      </div>
    </div>

    <!-- 学术资源 -->
    <div v-if="themeData.socialLinks" class="mt-[16px]">
      <Icon icon="FolderOpenOutlined" text="学术资源" :textSize="13" class="font-[600] text-[#475569] dark:text-[#94a3b8] tracking-wide"></Icon>
      <div class="pt-[10px] flex justify-center gap-[14px]">
        <span v-for="(item, index) in themeData.socialLinks" :key="index">
          <client-only>
            <Icon :icon="item.icon" :link="item.link" target="_blank" :iconSize="22" :iconColor="useRandomColor()" class="transition-transform duration-250 hover:scale-125"></Icon>
          </client-only>
        </span>
      </div>
    </div>

    <!-- 分隔线 -->
    <div class="my-[18px] flex items-center gap-[10px]">
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent dark:via-[rgba(255,255,255,0.06)]"></div>
    </div>

    <!-- 研究领域 -->
    <div class="w-full flex my-[10px] flex-wrap">
      <div class="w-full mb-[10px]">
        <Icon icon="AppstoreTwotone" text="研究领域" :textSize="13" class="font-[600] text-[#475569] dark:text-[#94a3b8] tracking-wide" />
      </div>
      <RouterLink
        v-for="({ items, path }, name) in category.map"
        :key="name"
        :to="path"
        class="w-full flex items-center justify-between text-[#64748b] dark:text-[#94a3b8] px-[14px] my-[3px] font-normal h-[36px] bg-[#f8fafb] hover:bg-[#2c7a5a] hover:text-[#fff] dark:bg-[#1a1e2e] dark:hover:bg-[#2c7a5a] rounded-[10px] transition-all duration-250 border border-transparent hover:border-[#2c7a5a]/20"
      >
        <span class="text-[13px]">{{ name }}</span>
        <span class="ml-[10px] min-w-[1.3rem] h-[1.3rem] leading-[1.3rem] text-center text-[10px] text-[#fff] rounded-[6px] px-[5px] font-[600]" style="background: linear-gradient(135deg, #2c7a5a, #3eaf7c)"> {{ items.length }}</span>
      </RouterLink>
    </div>

    <!-- 标签 -->
    <div class="w-full flex my-[10px] flex-wrap">
      <div class="w-full mb-[10px]">
        <Icon icon="TagsOutlined" text="标签列表" :textSize="13" class="font-[600] text-[#475569] dark:text-[#94a3b8] tracking-wide" />
      </div>
      <RouterLink v-for="({ items, path }, name) in tag.map" :key="name" :to="path" class="flex items-center text-[#64748b] dark:text-[#94a3b8] px-[10px] my-[3px] font-normal h-[26px] bg-[#f8fafb] hover:bg-[#2c7a5a] hover:text-[#fff] dark:bg-[#1a1e2e] dark:hover:bg-[#2c7a5a] rounded-full mx-[2px] transition-all duration-250 border border-[#e2e8f0]/40 dark:border-[rgba(255,255,255,0.04)] hover:border-[#2c7a5a]/20">
        <span class="text-[11px]">{{ name }}</span>
        <span class="ml-[4px] min-w-[1rem] h-[1rem] leading-[1rem] text-center text-[9px] text-[#fff] rounded-full px-[3px] font-[600]" style="background: linear-gradient(135deg, #2c7a5a, #2d8cf0)"> {{ items.length }}</span>
      </RouterLink>
    </div>

    <!-- 学术工具 -->
    <div class="w-full flex my-[10px] flex-wrap">
      <div class="w-full mb-[10px]">
        <Icon icon="LinkOutlined" text="学术工具" :textSize="13" class="font-[600] text-[#475569] dark:text-[#94a3b8] tracking-wide" />
      </div>
      <span class="mt-[4px] bg-[#f8fafb] dark:bg-[#1a1e2e] rounded-[10px] transition-all duration-250 hover:shadow-md w-full border border-[#e2e8f0]/40 dark:border-[rgba(255,255,255,0.04)] hover:border-[#2c7a5a]/20" v-for="(item, index) in themeData.friendLink" :key="index">
        <a :href="item.link" target="_blank" class="flex items-center text-[#2c7a5a] dark:text-[#4eca8a] py-[8px] px-[14px] text-[13px] font-[500]">
          <span>{{ item.title }}</span>
        </a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'
import { usePageFrontmatter, withBase } from '@vuepress/client'
import { useRandomColor } from '../../utils/useColor'
import { useBlogCategory, useBlogType } from 'vuepress-plugin-blog2/lib/client'
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
</script>
