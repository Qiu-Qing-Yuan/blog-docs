<template>
  <div class="blog-item group relative w-full py-[16px] px-[16px] sm:px-[28px] sm:py-[24px] rounded-[16px] dark:bg-[#161822] bg-[#fff] shadow-card dark:shadow-[0_1px_3px_rgba(255,255,255,0.03),0_4px_16px_rgba(255,255,255,0.04)] mb-[20px] cursor-pointer box-border transition-all duration-500 ease-out hover:shadow-card-hover dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.05),0_16px_40px_rgba(255,255,255,0.06)] hover:-translate-y-[3px] border border-transparent dark:border-[rgba(255,255,255,0.04)]">
    <!-- 顶部装饰线 -->
    <div class="absolute top-0 left-[28px] right-[28px] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

    <div v-if="!isMobile">
      <div class="left-box flex mt-[12px] items-center" v-if="position == 'left'">
        <div class="img h-[200px] rounded-[12px] overflow-hidden flex-[0_0_48%]">
          <img :src="page.data.frontmatter.image ? page.data.frontmatter.image : withBase('/images/index/bg1.jpg')" class="w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.06]" loading="lazy" />
        </div>
        <div class="content flex-1 pl-[36px] flex flex-wrap m-0 overflow-hidden">
          <div class="title w-full">
            <router-link :to="page.data.path" class="font-[600] text-[1.2rem] text-[color:var(--text-color)] truncate block tracking-tight" :title="page.data.title">{{ page.data.title }}</router-link>
          </div>
          <div class="abstract w-full h-[160px] font-normal text-[#64748b] dark:text-[#94a3b8] text-[13.5px] leading-[1.85]" v-html="page.data.excerpt"></div>
        </div>
      </div>
      <div class="right-box flex mt-[12px] items-center" v-else>
        <div class="content flex-1 pr-[36px] flex flex-wrap m-0 overflow-hidden">
          <div class="title w-full">
            <router-link :to="page.data.path" class="font-[600] text-[1.2rem] text-[color:var(--text-color)] truncate block tracking-tight" :title="page.data.title">{{ page.data.title }}</router-link>
          </div>
          <div class="abstract w-full h-[160px] font-normal text-[#64748b] dark:text-[#94a3b8] text-[13.5px] leading-[1.85]" v-html="page.data.excerpt"></div>
        </div>
        <div class="img h-[200px] rounded-[12px] overflow-hidden flex-[0_0_48%]">
          <img :src="page.data.frontmatter.image ? page.data.frontmatter.image : withBase('/images/index/bg1.jpg')" class="w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.06]" loading="lazy" />
        </div>
      </div>
    </div>
    <div class="mobile-box flex flex-wrap !h-auto" v-else>
      <div class="img w-full h-[150px] rounded-[10px] overflow-hidden">
        <img :src="page.data.frontmatter.image ? page.data.frontmatter.image : withBase('/images/index/bg1.jpg')" class="w-full h-full object-cover" loading="lazy" />
      </div>
      <div class="content w-full flex flex-wrap overflow-hidden">
        <div class="title w-full mt-[10px]">
          <router-link :to="page.data.path" class="font-[600] text-[0.95rem] text-[color:var(--text-color)] truncate block" :title="page.data.title">{{ page.data.title }}</router-link>
        </div>
        <div class="abstract w-full h-[80px] font-normal text-[#64748b] dark:text-[#94a3b8] text-[12.5px] leading-[1.7] overflow-hidden" v-html="page.data.excerpt"></div>
      </div>
    </div>
    <div class="toTop absolute top-[10px] right-[10px] z-0" v-if="page.data.frontmatter.sticky">
      <Icon icon="VerticalAlignTopOutlined" :iconSize="26" iconColor="#fff"> </Icon>
    </div>
    <BlogItemInfo :page="page.data"></BlogItemInfo>
  </div>
</template>

<script setup lang="ts">
import { withBase } from '@vuepress/client'
import BlogItemInfo from './BlogItemInfo.vue'
import { isMobile } from '../../utils'
interface BlogPageData {
  data: {
    path: string;
    title: string;
    excerpt: string;
    frontmatter: {
      image?: string;
      sticky?: boolean;
      [key: string]: any;
    };
  };
}

const props = defineProps<{
  page: BlogPageData
  position: 'left' | 'right'
}>()
</script>

<style lang="scss" scoped>
.blog-item {
  .abstract {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    // 去掉首行缩进，改用更现代的排版
    text-indent: 0;
    // 摘要中的段落样式
    p {
      margin: 0;
    }
  }

  .title {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: linear-gradient(90deg, #2c7a5a, #2d8cf0);
      visibility: hidden;
      transform: scaleX(0);
      transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: left;
      border-radius: 2px;
    }

    &:hover a {
      color: #2c7a5a;
    }

    &:hover:after {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  :deep(.dark) & .title:hover a {
    color: #4eca8a;
  }

  .toTop {
    z-index: 1;
  }

  .toTop::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 46px solid transparent;
    border-top: 46px solid #2c7a5a;
    position: absolute;
    left: -18px;
    top: 0;
    z-index: -1;
  }
}

:root.dark .blog-item .toTop::before {
  border-top-color: #4eca8a;
}
</style>
