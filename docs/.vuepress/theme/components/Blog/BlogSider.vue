<template>
  <div class="w-full pb-[40px] rounded-[12px] px-[15px] dark:bg-[#1e1e2a] bg-[#fff] shadow-sidebar cursor-pointer border-box sticky top-[70px] overflow-hidden">
    <!-- 作者信息区域 -->
    <div class="author-section relative w-full flex flex-wrap items-center justify-center pt-[2rem] pb-[1.5rem] mb-[16px]">
      <div class="absolute inset-0 bg-gradient-to-br from-[#3eaf7c]/10 to-[#2d8cf0]/10 dark:from-[#3eaf7c]/5 dark:to-[#2d8cf0]/5"></div>
      <img class="relative rounded-[50%] h-[5rem] w-[5rem] mt-[0.5rem] mb-[0.8rem] inline-block ring-2 ring-[#3eaf7c]/30 ring-offset-2 ring-offset-white dark:ring-offset-[#1e1e2a] transition-transform duration-300 hover:scale-110" v-if="themeData.authorAvatar" :src="withBase(themeData.authorAvatar)" alt="author-avatar" />
      <h3 class="relative block w-full text-center m-0 font-[600] text-[1.1rem]" v-if="themeData.author">{{ themeData.author }}</h3>
    </div>
    <!-- 统计数据 -->
    <div class="w-[85%] flex flex-wrap items-center justify-center my-[16px] mx-auto">
      <div class="text-center flex-[0_0_33%] border-r-[#eee] dark:border-r-[#333] border-r border-solid border-y-0 border-l-0">
        <h3 class="m-0 text-[#3eaf7c] font-[700] text-[1.3rem]">{{ post.items.length }}</h3>
        <h6 class="m-0 font-normal mt-[6px] text-[12px] text-[#999]">论文</h6>
      </div>
      <div class="text-center flex-[0_0_33%] border-r-[#eee] dark:border-r-[#333] border-r border-solid border-y-0 border-l-0">
        <h3 class="m-0 text-[#2d8cf0] font-[700] text-[1.3rem]">{{ Object.keys(category.map).length }}</h3>
        <h6 class="m-0 font-normal mt-[6px] text-[12px] text-[#999]">领域</h6>
      </div>
      <div class="text-center flex-[0_0_33%]">
        <h3 class="m-0 text-[#e6a23c] font-[700] text-[1.3rem]">{{ Object.keys(tag.map).length }}</h3>
        <h6 class="m-0 font-normal mt-[6px] text-[12px] text-[#999]">标签</h6>
      </div>
    </div>
    <!--个人摘要 -->
    <div v-if="frontmatter.summary" class="leading-[28px] border-solid border-l-[4px] border-l-[#3eaf7c] border-y-0 border-r-0 bg-[#f8f9fa] dark:bg-[#2a2a3a] pl-[12px] my-[12px] text-[13px] rounded-r-[6px] py-[8px]">{{ frontmatter.summary }}</div>
    <!--研究方向 -->
    <div v-if="frontmatter.hobby" class="mt-[12px]">
      <Icon icon="ExperimentOutlined" text="研究方向" :textSize="14" class="font-[500]"></Icon>
      <div class="mt-[8px] flex flex-wrap gap-[6px]">
        <span v-for="(item, index) in frontmatter.hobby" :key="index" :style="{ backgroundColor: useRandomColor() }" class="px-[10px] py-[4px] rounded-full inline-block text-[12px] text-[#fff] transition-transform duration-200 hover:scale-105">{{ item }}</span>
      </div>
    </div>
    <!--学术资源-->
    <div v-if="themeData.socialLinks" class="mt-[16px]">
      <Icon icon="FolderOpenOutlined" text="学术资源" :textSize="14" class="font-[500]"></Icon>
      <div class="pt-[10px] flex justify-center gap-[12px]">
        <span v-for="(item, index) in themeData.socialLinks" :key="index">
          <client-only>
            <Icon :icon="item.icon" :link="item.link" target="_blank" :iconSize="24" :iconColor="useRandomColor()" class="transition-transform duration-200 hover:scale-125"></Icon>
          </client-only>
        </span>
      </div>
    </div>
    <hr class="my-[16px] border-[#eee] dark:border-[#333]" />
    <!--研究领域 -->
    <div class="w-full flex my-[12px] flex-wrap">
      <div class="w-full mb-[8px]">
        <Icon icon="AppstoreTwotone" text="研究领域" :textSize="14" class="font-[500] dark:hover:text-[#fff]" />
      </div>
      <RouterLink
        v-for="({ items, path }, name) in category.map"
        :key="name"
        :to="path"
        class="shadow-item w-full flex items-center justify-between text-[#666] px-[14px] my-[4px] font-normal h-[38px] bg-[#f8f9fa] hover:bg-[#3eaf7c] hover:text-[#fff] dark:bg-[#2a2a3a] dark:hover:bg-[#3eaf7c] dark:text-[#ddd] rounded-[8px] mx-[5px] transition-all duration-200"
      >
        <span class="text-[13px]">{{ name }}</span>
        <span class="ml-[10px] w-[1.2rem] h-[1.2rem] leading-[1.2rem] text-center text-[.7rem] text-[#fff] rounded-[4px]" :style="{ 'background-color': useRandomColor() }"> {{ items.length }}</span>
      </RouterLink>
    </div>
    <!--标签-->
    <div class="w-full flex my-[12px] flex-wrap">
      <div class="w-full mb-[8px]">
        <Icon icon="TagsOutlined" text="标签列表" :textSize="14" class="font-[500] dark:hover:text-[#fff]" />
      </div>
      <RouterLink v-for="({ items, path }, name) in tag.map" :key="name" :to="path" class="shadow-item flex items-center text-[#666] px-[10px] my-[4px] font-normal h-[28px] bg-[#f8f9fa] hover:bg-[#3eaf7c] hover:text-[#fff] dark:bg-[#2a2a3a] dark:hover:bg-[#3eaf7c] dark:text-[#ddd] rounded-full mx-[3px] transition-all duration-200">
        <span class="text-[11px]">{{ name }}</span>
        <span class="ml-[5px] w-[1rem] h-[1rem] leading-[1rem] text-center text-[9px] text-[#fff] rounded-full" :style="{ 'background-color': useRandomColor() }"> {{ items.length }}</span>
      </RouterLink>
    </div>
    <!--学术工具-->
    <div class="w-full flex my-[12px] flex-wrap">
      <div class="w-full mb-[8px]">
        <Icon icon="LinkOutlined" text="学术工具" :textSize="14" class="font-[500] dark:hover:text-[#fff]" />
      </div>
      <span class="shadow-item mt-[8px] bg-[#f8f9fa] dark:bg-[#2a2a3a] rounded-[8px] transition-all duration-200 hover:scale-105 hover:shadow-md" v-for="(item, index) in themeData.friendLink" :key="index">
        <a :href="item.link" target="_blank" class="flex items-center justify-between text-[#3eaf7c] py-[8px] px-[14px] text-[13px]">
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
