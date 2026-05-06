<template>
  <div class="blog-item group relative w-full py-[18px] px-[18px] sm:px-[28px] sm:py-[26px] rounded-[16px] bg-[#fff] dark:bg-[#161822] mb-[22px] cursor-pointer box-border transition-all duration-500 ease-out hover:-translate-y-[2px] border border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] overflow-hidden shadow-card hover:shadow-card-hover">
    <!-- 左侧学术装饰条 -->
    <div class="absolute left-0 top-[20px] bottom-[20px] w-[3px] rounded-full bg-gradient-to-b from-[#1a5c3a]/0 via-[#1a5c3a]/30 to-[#1a5c3a]/0 dark:via-[#4eca8a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div v-if="!isMobile">
      <div class="left-box flex mt-[12px] items-center gap-[32px]" v-if="position == 'left'">
        <div class="img h-[200px] rounded-[12px] overflow-hidden flex-[0_0_48%] min-w-0 relative">
          <img :src="page.data.frontmatter.image ? page.data.frontmatter.image : withBase('/images/index/bg1.jpg')" class="w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.04]" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="content flex-1 min-w-0 flex flex-wrap m-0 overflow-hidden">
          <div class="title w-full">
            <router-link :to="page.data.path" class="font-[600] text-[1.15rem] text-[color:var(--text-color)] truncate block tracking-tight leading-[1.5]" :title="page.data.title">{{ page.data.title }}</router-link>
          </div>
          <div class="abstract w-full h-[160px] font-normal text-[#5a5a72] dark:text-[#9494a8] text-[13.5px] leading-[1.9]" v-html="page.data.excerpt"></div>
        </div>
      </div>
      <div class="right-box flex mt-[12px] items-center gap-[32px]" v-else>
        <div class="content flex-1 min-w-0 flex flex-wrap m-0 overflow-hidden">
          <div class="title w-full">
            <router-link :to="page.data.path" class="font-[600] text-[1.15rem] text-[color:var(--text-color)] truncate block tracking-tight leading-[1.5]" :title="page.data.title">{{ page.data.title }}</router-link>
          </div>
          <div class="abstract w-full h-[160px] font-normal text-[#5a5a72] dark:text-[#9494a8] text-[13.5px] leading-[1.9]" v-html="page.data.excerpt"></div>
        </div>
        <div class="img h-[200px] rounded-[12px] overflow-hidden flex-[0_0_48%] min-w-0 relative">
          <img :src="page.data.frontmatter.image ? page.data.frontmatter.image : withBase('/images/index/bg1.jpg')" class="w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.04]" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
    <div class="mobile-box flex flex-wrap !h-auto min-w-0" v-else>
      <div class="img w-full h-[150px] rounded-[10px] overflow-hidden relative">
        <img :src="page.data.frontmatter.image ? page.data.frontmatter.image : withBase('/images/index/bg1.jpg')" class="w-full h-full object-cover" loading="lazy" />
      </div>
      <div class="content w-full flex flex-wrap overflow-hidden min-w-0">
        <div class="title w-full mt-[10px]">
          <router-link :to="page.data.path" class="font-[600] text-[0.95rem] text-[color:var(--text-color)] truncate block" :title="page.data.title">{{ page.data.title }}</router-link>
        </div>
        <div class="abstract w-full h-[80px] font-normal text-[#5a5a72] dark:text-[#9494a8] text-[12.5px] leading-[1.7] overflow-hidden" v-html="page.data.excerpt"></div>
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
    text-indent: 0;
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
      background: linear-gradient(90deg, #1a5c3a, #2d8cf0);
      visibility: hidden;
      transform: scaleX(0);
      transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: left;
      border-radius: 2px;
    }

    &:hover a {
      color: #1a5c3a;
    }

    &:hover:after {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  :deep(.dark) & .title:hover a {
    color: #4eca8a;
  }

  :deep(.dark) & .title:after {
    background: linear-gradient(90deg, #4eca8a, #2d8cf0);
  }

  .toTop {
    z-index: 1;
  }

  .toTop::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 46px solid transparent;
    border-top: 46px solid #1a5c3a;
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
